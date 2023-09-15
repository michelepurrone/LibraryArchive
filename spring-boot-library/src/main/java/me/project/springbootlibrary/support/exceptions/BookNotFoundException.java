package me.project.springbootlibrary.support.exceptions;

public class BookNotFoundException extends RuntimeException {

    public BookNotFoundException(String message) { super(message); }

}
