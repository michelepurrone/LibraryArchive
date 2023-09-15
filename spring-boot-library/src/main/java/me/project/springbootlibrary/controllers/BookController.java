package me.project.springbootlibrary.controllers;

import me.project.springbootlibrary.models.Book;
import me.project.springbootlibrary.services.BookService;
import me.project.springbootlibrary.support.responses.DownloadResponse;
import me.project.springbootlibrary.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("***")
@RestController
@RequestMapping("/api/books")
public class BookController {

    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }


    @GetMapping("/secure/currentlibrary")
    public List<Book> currentMyLibrary(@RequestHeader(value = "Authorization") String token) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.currentMyLibrary(userEmail);
    }

    @GetMapping("/secure/currentlibrary/count")
    public int currentMyLibraryCount(@RequestHeader(value = "Authorization") String token) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.currentMyLibraryCount(userEmail);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.checkoutBookByUser(userEmail, bookId);
    }

    @PutMapping("/secure/checkout")
    public Book checkoutBook (@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.checkoutBook(userEmail, bookId);
    }

    @PutMapping("/secure/return")
    public void returnBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        bookService.returnBook(userEmail, bookId);
    }

    @GetMapping("/secure/download")
    public DownloadResponse downloadBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.downloadBook(userEmail, bookId);
    }

}
