class BookModel {
    id: number;
    title: string;
    author?: string;
    language?: string;
    publisher?: string;
    isbn?: string;
    description?: string;
    copies?: number;
    copiesAvailable?: number;
    category?: string;
    img?: string;
    pdf?: string;

    constructor (id: number, title: string, author: string, language: string, publisher: string, isbn: string, description: string, 
        copies: number, copiesAvailable: number, category: string, img: string, pdf: string) {
            this.id = id;
            this.title = title;
            this.author = author;
            this.language = language;
            this.publisher = publisher;
            this.isbn = isbn;
            this.description = description;
            this.copies = copies;
            this.copiesAvailable = copiesAvailable;
            this.category = category;
            this.img = img;
            this.pdf = pdf;
    }
}

export default BookModel;