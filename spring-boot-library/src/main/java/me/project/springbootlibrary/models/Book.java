package me.project.springbootlibrary.models;

import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name = "book")
@Data
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "language")
    private String language;

    @Column(name = "publisher")
    private String publisher;

    @Column(name = "isbn", unique = true)
    public String isbn;

    @Column(name = "description")
    private String description;

    @Column(name = "copies")
    private int copies;

    @Column(name = "copies_available")
    private int copiesAvailable;

    @Column(name = "category")
    private String category;

    @Column(name = "img")
    private String img;

    @Column(name = "pdf")
    private String pdf;

    @Version
    @Column(name = "version")
    private long version = 0L;

}
