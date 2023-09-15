package me.project.springbootlibrary.support.exceptions;

public class BookAlreadyExistsException extends RuntimeException {

    public BookAlreadyExistsException(String message) { super(message); }

}
