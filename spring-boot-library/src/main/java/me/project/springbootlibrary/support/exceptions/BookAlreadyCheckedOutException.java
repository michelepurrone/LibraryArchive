package me.project.springbootlibrary.support.exceptions;

public class BookAlreadyCheckedOutException extends RuntimeException {

    public BookAlreadyCheckedOutException(String message) { super(message); }

}
