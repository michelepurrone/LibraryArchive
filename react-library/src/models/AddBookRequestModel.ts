class AddBookRequestModel {
    title: string;
    author: string;
    language: string;
    publisher: string;
    isbn: string;
    description: string;
    copies: number;
    category: string;
    img?: string;
    pdf?: string;

    constructor(title: string, author: string, language: string, publisher: string, isbn: string, description: string, copies: number, 
        category: string) {
            this.title = title;
            this.author = author;
            this.language = language;
            this.publisher = publisher;
            this.isbn = isbn;
            this.description = description;
            this.copies = copies;
            this.category = category;
        }
}

export default AddBookRequestModel;