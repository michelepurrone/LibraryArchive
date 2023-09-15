package me.project.springbootlibrary.repositories;

import me.project.springbootlibrary.models.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    Page<Book> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);

    Page<Book> findByAuthorContaining(@RequestParam("author") String author, Pageable pageable);

    Page<Book> findByIsbn(@RequestParam("isbn") String isbn, Pageable pageable);

    boolean existsByIsbn(String isbn);

    Page<Book> findByCategory(@RequestParam("category") String category, Pageable pageable);

    Page<Book> findByLanguage(@RequestParam("language") String language, Pageable pageable);

    @Query("select o from Book o where id in :book_ids")
    List<Book> findBooksByBookIds (@Param("book_ids") List<Long> bookId);

}
