package me.project.springbootlibrary.services;

import me.project.springbootlibrary.models.Book;
import me.project.springbootlibrary.models.Checkout;
import me.project.springbootlibrary.models.History;
import me.project.springbootlibrary.repositories.BookRepository;
import me.project.springbootlibrary.repositories.CheckoutRepository;
import me.project.springbootlibrary.repositories.HistoryRepository;
import me.project.springbootlibrary.support.exceptions.BookAlreadyCheckedOutException;
import me.project.springbootlibrary.support.exceptions.BookNotFoundException;
import me.project.springbootlibrary.support.exceptions.FailedCheckOutException;
import me.project.springbootlibrary.support.responses.DownloadResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class BookService {

    private BookRepository bookRepository;

    private CheckoutRepository checkoutRepository;

    private HistoryRepository historyRepository;

    @Autowired
    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository, HistoryRepository historyRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
        this.historyRepository = historyRepository;
    }

    public Book checkoutBook(String userEmail, Long bookId) {
        Optional<Book> book = bookRepository.findById(bookId);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if(book.isEmpty() || validateCheckout != null || book.get().getCopiesAvailable() <= 0) {
            throw new BookAlreadyCheckedOutException("Book doesn't exist or already checked out!");
        }
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        bookRepository.save(book.get());
        Checkout checkout = new Checkout(userEmail, LocalDate.now().toString(), book.get().getId());
        checkoutRepository.save(checkout);
        return book.get();
    }

    public Boolean checkoutBookByUser(String userEmail, Long bookId) {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        return validateCheckout != null;
    }

    public int currentMyLibraryCount(String userEmail) {
        return checkoutRepository.findBooksByUserEmail(userEmail).size();
    }

    public List<Book> currentMyLibrary(String userEmail) {
        List<Book> shelf = new ArrayList<>();
        List<Checkout> checkoutList = checkoutRepository.findBooksByUserEmail(userEmail);
        List<Long> bookIdList = new ArrayList<>();
        for(Checkout c : checkoutList) {
            bookIdList.add(c.getBookId());
        }
        List<Book> books = bookRepository.findBooksByBookIds(bookIdList);
        for(Book b : books) {
            Optional<Checkout> checkout = checkoutList.stream()
                    .filter(x -> x.getBookId() == b.getId()).findFirst();
            if (checkout.isPresent()) {
                shelf.add(b);
            }
        }
        return shelf;
    }

    public void returnBook(String userEmail, Long bookId) {
        Optional<Book> book = bookRepository.findById(bookId);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if(book.isEmpty() || validateCheckout == null) {
            throw new FailedCheckOutException("Book does not exist or not checked out!");
        }
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() + 1);
        bookRepository.save(book.get());
        checkoutRepository.deleteById(validateCheckout.getId());
    }

    public DownloadResponse downloadBook(String userEmail, Long bookId) {
        Optional<Book> book = bookRepository.findById(bookId);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if(validateCheckout == null) {
            throw new FailedCheckOutException("Book not checked out!");
        }
        checkoutRepository.deleteById(validateCheckout.getId());
        if(book.isPresent()) {
            String title = book.get().getTitle();
            String pdf = book.get().getPdf();
            History history = new History(
                    userEmail,
                    validateCheckout.getCheckoutDate(),
                    book.get().getTitle(),
                    book.get().getAuthor(),
                    book.get().getDescription(),
                    book.get().getImg()
            );
            historyRepository.save(history);
            return new DownloadResponse(title, pdf);
        } else {
            throw new BookNotFoundException("Book not found!");
        }
    }

}
