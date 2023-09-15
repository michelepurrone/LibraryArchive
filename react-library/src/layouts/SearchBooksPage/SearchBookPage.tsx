import { useEffect, useState } from 'react';
import BookModel from '../../models/BookModel';
import { Pagination } from '../Utils/Pagination';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { SearchBook } from './components/SearchBook';

export const SearchBooksPage = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    {/*Pagination*/}
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);


    {/*Search*/}
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    {/*SearchCategory*/}
    const [categorySelection, setCategorySelection] = useState('Per categoria');
    {/*SearchLanguage*/}
    const [languageSelection, setLanguageSelection] = useState('Per lingua');

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = `${process.env.REACT_APP_API}/books`;
            let url: string = '';
            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
            } else {
                let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`);
                url = baseUrl + searchWithPage;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;

            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedBooks: BookModel[] = [];

            for (const key in responseData) {
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    language: responseData[key].language,
                    publisher: responseData[key].publisher,
                    isbn: responseData[key].isbn,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img,
                });
            }

            setBooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    {/*Search*/}
    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`);
        }
        setCategorySelection('Per categoria');
        setLanguageSelection('Per lingua');
    }

    {/*Category*/}
    const categoryField = (value: string) => {
        setCurrentPage(1);
        if (
            value.toLowerCase() === 'saggio' || 
            value.toLowerCase() === 'scienza' || 
            value.toLowerCase() === 'informatica' || 
            value.toLowerCase() === 'diritto' ||
            value.toLowerCase() === 'romanzo'
        ) {
            setCategorySelection(value);
            setLanguageSelection('Per lingua');
            setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`)
        } else {
            setCategorySelection('Per categoria');
            setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)
        }
    }

    {/*Language*/}
    const languageField = (value: string) => {
        setCurrentPage(1);
        if (
            value.toLowerCase() === 'ita' || 
            value.toLowerCase() === 'eng' || 
            value.toLowerCase() === 'fra' || 
            value.toLowerCase() === 'spa' ||
            value.toLowerCase() === 'jap'
        ) {
            setLanguageSelection(value);
            setCategorySelection('Per categoria');
            setSearchUrl(`/search/findByLanguage?language=${value}&page=<pageNumber>&size=${booksPerPage}`)
        } else {
            setLanguageSelection('Per lingua');
            setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)
        }
    }

    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ?
        booksPerPage * currentPage : totalAmountOfBooks;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='search'
                                    placeholder='Cerca...' aria-labelledby='Search'
                                    onChange={e => setSearch(e.target.value)} />
                                <button className='btn btn-outline-success'
                                    onClick={() => searchHandleChange()}>
                                    Cerca
                                </button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    {categorySelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={() => categoryField('Tutte')}>
                                        <a className='dropdown-item' href='#'>
                                            Tutte
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('saggio')}>
                                        <a className='dropdown-item' href='#'>
                                            SAGGIO
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('scienza')}>
                                        <a className='dropdown-item' href='#'>
                                            SCIENZA
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('informatica')}>
                                        <a className='dropdown-item' href='#'>
                                            INFORMATICA
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('diritto')}>
                                        <a className='dropdown-item' href='#'>
                                            DIRITTO
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('romanzo')}>
                                        <a className='dropdown-item' href='#'>
                                            ROMANZO
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton2' data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    {languageSelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton2'>
                                    <li onClick={() => languageField('Tutte')}>
                                        <a className='dropdown-item' href='#'>
                                            Tutte
                                        </a>
                                    </li>
                                    <li onClick={() => languageField('ITA')}>
                                        <a className='dropdown-item' href='#'>
                                            Italiano
                                        </a>
                                    </li>
                                    <li onClick={() => languageField('ENG')}>
                                        <a className='dropdown-item' href='#'>
                                            Inglese
                                        </a>
                                    </li>
                                    <li onClick={() => languageField('FRA')}>
                                        <a className='dropdown-item' href='#'>
                                            Francese
                                        </a>
                                    </li>
                                    <li onClick={() => languageField('SPA')}>
                                        <a className='dropdown-item' href='#'>
                                            Spagnolo
                                        </a>
                                    </li>
                                    <li onClick={() => languageField('JAP')}>
                                        <a className='dropdown-item' href='#'>
                                            Giapponese
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfBooks > 0 ?
                        <>
                            <div className='mt-3'>
                                <h5>Numero di risultati: ({totalAmountOfBooks})</h5>
                            </div>
                            <p>
                                Mostra da {indexOfFirstBook + 1} a {lastItem} su {totalAmountOfBooks} titoli totali:
                            </p>
                            {books.map(book => (
                                <SearchBook book={book} key={book.id} />
                            ))}
                        </>
                        :
                        <div className='m-5'>
                            <h3>
                                Non riesci a trovare quello che cerchi? Informa un amministratore!
                            </h3>
                        </div>
                    }
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }
                </div>
            </div>
        </div>
    );
}