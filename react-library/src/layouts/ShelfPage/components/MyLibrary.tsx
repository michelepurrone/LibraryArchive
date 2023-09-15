import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { MyLibraryModal } from './MyLibraryModal';
import BookModel from '../../../models/BookModel';

export const MyLibrary = () => {

    const { authState } = useOktaAuth();
    const [httpError, setHttpError] = useState(null);

    // Current Loans
    const [shelfBooks, setShelfBooks] = useState<BookModel[]>([]);
    const [isLoadingUserMyLibrary, setIsLoadingUserMyLibrary] = useState(true);
    const [checkout, setCheckout] = useState(false);

    let title: string;
    // base64 string
    let pdf: string;
    

    useEffect(() => {
        const fetchUserCurrentMyLibrary = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/books/secure/currentlibrary`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const shelfCurrentMyLibraryResponse = await fetch(url, requestOptions);
                if (!shelfCurrentMyLibraryResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const shelfCurrentMyLibraryResponseJson = await shelfCurrentMyLibraryResponse.json();
                setShelfBooks(shelfCurrentMyLibraryResponseJson);
            }
            setIsLoadingUserMyLibrary(false);
        }
        fetchUserCurrentMyLibrary().catch((error: any) => {
            setIsLoadingUserMyLibrary(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [authState, checkout]);

    if (isLoadingUserMyLibrary) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>
                    {httpError}
                </p>
            </div>
        );
    }

    async function returnBook(bookId: number) {
        const url = `${process.env.REACT_APP_API}/books/secure/return/?bookId=${bookId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setCheckout(!checkout);
    }

    async function downloadBook(bookId: number) {
        const url = `${process.env.REACT_APP_API}/books/secure/download/?bookId=${bookId}`;
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            console.log(response);
            console.log(response.text);
            const responseJson = await response.json();
            
            title = responseJson.title;
            pdf = responseJson.pdf;
            
            // decode base64 string, remove space for IE compatibility
            var binary = atob(pdf.replace(/\s/g, ''));
            var len = binary.length;
            var buffer = new ArrayBuffer(len);
            var view = new Uint8Array(buffer);
            for (var i = 0; i < len; i++) {
                view[i] = binary.charCodeAt(i);
            }
            
            const downloadFile = (blob: Blob, fileName: string) => {
                const link = document.createElement('a');
                // create a blobURI pointing to our Blob
                link.href = URL.createObjectURL(blob);
                link.download = fileName;
                // some browser needs the anchor to be in the doc
                document.body.append(link);
                link.click();
                link.remove();
                // in case the Blob uses a lot of memory
                setTimeout(() => URL.revokeObjectURL(link.href), 7000);
              };
              
              
            downloadFile(new Blob([view], { type: "application/pdf" }), `${title}.pdf`);

            setCheckout(!checkout);
        }
    }

    return (
        <div>
            {/* Desktop */}
            <div className='d-none d-lg-block mt-2'>
                {shelfBooks.length > 0 ?
                    <>
                        <h5>La tua libreria: </h5>

                        {shelfBooks.map(book => (
                            <div key={book.id}>
                                <div className='row mt-3 mb-3'>
                                    <div className='col-4 col-md-4 container'>
                                        {book?.img ?
                                            <img src={book?.img} width='226' height='349' alt='Book' />
                                            :
                                            <img src={require('./../../../Images/BooksImages/book.png')}
                                                width='226' height='349' alt='Book' />
                                        }
                                    </div>
                                    <div className='card col-3 col-md-3 container d-flex'>
                                        <div className='card-body'>
                                            <div className='mt-3'>
                                                <div className='list-group mt-3'>
                                                    <button className='list-group-item list-group-item-action'
                                                        aria-current='true' data-bs-toggle='modal'
                                                        data-bs-target={`#modal${book.id}`}>
                                                        Gestisci
                                                    </button>
                                                    <Link to={'search'} className='list-group-item list-group-item-action'>
                                                        Cerca altri titoli
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr />
                                            <p className='mt-3'>
                                                Lascia una valutazione per aiutare gli altri utenti.
                                            </p>
                                            <Link className='btn btn-primary' to={`/checkout/${book.id}`}>
                                                Lascia una valutazione
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <MyLibraryModal book={book} mobile={false} returnBook={returnBook}
                                    downloadBook={downloadBook} />
                            </div>
                        ))}
                    </> :
                    <>
                        <h3 className='mt-3'>
                            La tua libreria è vuota.
                        </h3>
                        <Link className='btn btn-primary' to={`search`}>
                            Cerca altri titoli!
                        </Link>
                    </>
                }
            </div>

            {/* Mobile */}
            <div className='container d-lg-none mt-2'>
                {shelfBooks.length > 0 ?
                    <>
                        <h5 className='mb-3'>La tua libreria: </h5>

                        {shelfBooks.map(book => (
                            <div key={book.id}>
                                <div className='d-flex justify-content-center align-items-center'>
                                    {book?.img ?
                                        <img src={book?.img} width='226' height='349' alt='Book' />
                                        :
                                        <img src={require('./../../../Images/BooksImages/book.png')}
                                            width='226' height='349' alt='Book' />
                                    }
                                </div>
                                <div className='card d-flex mt-5 mb-3'>
                                    <div className='card-body container'>
                                        <div className='mt-3'>
                                            <div className='list-group mt-3'>
                                                <button className='list-group-item list-group-item-action'
                                                    aria-current='true' data-bs-toggle='modal'
                                                    data-bs-target={`#mobilemodal${book.id}`}>
                                                    Gestisci
                                                </button>
                                                <Link to={'search'} className='list-group-item list-group-item-action'>
                                                    Cerca altri titoli
                                                </Link>
                                            </div>
                                        </div>
                                        <hr />
                                        <p className='mt-3'>
                                            Lascia una valutazione per aiutare gli altri utenti.
                                        </p>
                                        <Link className='btn btn-primary' to={`/checkout/${book.id}`}>
                                            Lascia una valutazione
                                        </Link>
                                    </div>
                                </div>

                                <hr />
                                <MyLibraryModal book={book} mobile={true} returnBook={returnBook}
                                    downloadBook={downloadBook} />
                            </div>
                        ))}
                    </> :
                    <>
                        <h3 className='mt-3'>
                            La tua libreria è vuota.
                        </h3>
                        <Link className='btn btn-primary' to={`search`}>
                            Cerca altri titoli!
                        </Link>
                    </>
                }
            </div>
        </div>
    );
}