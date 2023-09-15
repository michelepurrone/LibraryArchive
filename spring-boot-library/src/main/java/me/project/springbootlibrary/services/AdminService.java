package me.project.springbootlibrary.services;

import me.project.springbootlibrary.models.Book;
import me.project.springbootlibrary.repositories.BookRepository;
import me.project.springbootlibrary.repositories.CheckoutRepository;
import me.project.springbootlibrary.repositories.ReviewRepository;
import me.project.springbootlibrary.support.exceptions.BookAlreadyExistsException;
import me.project.springbootlibrary.support.exceptions.BookNotFoundException;
import me.project.springbootlibrary.support.exceptions.NegativeQuantityException;
import me.project.springbootlibrary.support.requests.AddBookRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AdminService {

    private BookRepository bookRepository;
    private ReviewRepository reviewRepository;
    private CheckoutRepository checkoutRepository;

    @Autowired
    public AdminService (BookRepository bookRepository, ReviewRepository reviewRepository, CheckoutRepository checkoutRepository) {
        this.bookRepository = bookRepository;
        this.reviewRepository = reviewRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public void increaseBookQuantity(Long bookId) {
        Optional<Book> book = bookRepository.findById(bookId);
        if(book.isEmpty()) {
            throw new BookNotFoundException("Book not found!");
        }
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() + 1);
        book.get().setCopies(book.get().getCopies() + 1);
        bookRepository.save(book.get());
    }

    public void decreaseBookQuantity(Long bookId) {
        Optional<Book> book = bookRepository.findById(bookId);
        if(book.isEmpty() || book.get().getCopiesAvailable() <= 0 || book.get().getCopies() <= 0) {
            throw new NegativeQuantityException("Book not found or quantity locked!");
        }
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        book.get().setCopies(book.get().getCopies() - 1);
        bookRepository.save(book.get());
    }

    public void postBook(AddBookRequest addBookRequest) {
        if(bookRepository.existsByIsbn(addBookRequest.getIsbn())) {
            throw new BookAlreadyExistsException("Book already exists!");
        } else {
            Book book = new Book();
            book.setTitle(addBookRequest.getTitle());
            book.setAuthor(addBookRequest.getAuthor());
            book.setLanguage(addBookRequest.getLanguage());
            book.setPublisher(addBookRequest.getPublisher());
            book.setIsbn(addBookRequest.getIsbn());
            book.setDescription(addBookRequest.getDescription());
            book.setCopies(addBookRequest.getCopies());
            book.setCopiesAvailable(addBookRequest.getCopies());
            book.setCategory(addBookRequest.getCategory());
            book.setImg(addBookRequest.getImg());
            book.setPdf(addBookRequest.getPdf());
            bookRepository.save(book);
        }
    }

    public void deleteBook(Long bookId) {
        Optional<Book> book = bookRepository.findById(bookId);
        if(book.isEmpty()) {
            throw new BookNotFoundException("Book not found!");
        }
        bookRepository.delete(book.get());
        checkoutRepository.deleteAllByBookId(bookId);
        reviewRepository.deleteAllByBookId(bookId);
    }

}
