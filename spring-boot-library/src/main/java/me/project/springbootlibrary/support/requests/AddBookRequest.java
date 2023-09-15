package me.project.springbootlibrary.support.requests;

import lombok.Data;

@Data
public class AddBookRequest {

    private String title;

    private String author;

    private String language;

    private String publisher;

    public String isbn;

    private String description;

    private int copies;

    private String category;

    private String img;

    private String pdf;

}
