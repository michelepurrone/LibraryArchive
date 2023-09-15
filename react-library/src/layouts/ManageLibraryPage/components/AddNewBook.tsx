import { useOktaAuth } from '@okta/okta-react';
import { useState } from 'react';
import AddBookRequestModel from '../../../models/AddBookRequestModel';

export const AddNewBook = () => {

    const { authState } = useOktaAuth();

    // New Book
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [language, setLanguage] = useState('Lingua');
    const [publisher, setPublisher] = useState('');
    const [isbn, setIsbn] = useState('');
    const [description, setDescription] = useState('');
    const [copies, setCopies] = useState(0);
    const [category, setCategory] = useState('Categoria');
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [selectedPdf, setSelectedPdf] = useState<any>(null);

    // Displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function categoryField(value: string) {
        setCategory(value);
    }

    function languageField(value: string) {
        setLanguage(value);
    }

    async function base64ConversionForImages(e: any) {
        if (e.target.files[0]) {
            getBase64ForImages(e.target.files[0]);
        }
    }

    async function base64ConversionForPdf(e: any) {
        if (e.target.files[0]) {
            getBase64ForPdf(e.target.files[0]);
        }
    }

    function getBase64ForImages(file: any) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setSelectedImage(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    function getBase64ForPdf(file: any) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setSelectedPdf(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    async function submitNewBook() {
        const url = `${process.env.REACT_APP_API}/admin/secure/add/book`;
        if (authState?.isAuthenticated && title !== '' && author !== '' && category !== 'Categoria' 
            && language !== 'Lingua' && publisher !== '' && isbn !== '' && description !== '' && copies >= 0) {
                const book: AddBookRequestModel = new AddBookRequestModel(title, author, language, publisher, isbn, description, copies, category);
                book.img = selectedImage;
                book.pdf = selectedPdf?.substring(selectedPdf?.indexOf(',') + 1);
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(book)
                };

                const submitNewBookResponse = await fetch(url, requestOptions);
                if (!submitNewBookResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                setTitle('');
                setAuthor('');
                setLanguage('Lingua');
                setPublisher('');
                setIsbn('');
                setDescription('');
                setCopies(0);
                setCategory('Categoria');
                setSelectedImage(null);
                setSelectedPdf(null);
                setDisplayWarning(false);
                setDisplaySuccess(true);
            } else {
                setDisplayWarning(true);
                setDisplaySuccess(false);
            }
    }

    return (
        <div className='container mt-5 mb-5'>
            {displaySuccess && 
                <div className='alert alert-success' role='alert'>
                    Caricamento riuscito!
                </div>
            }
            {displayWarning && 
                <div className='alert alert-danger' role='alert'>
                    È necessario riempire tutti i campi.
                </div>
            }
            <div className='card'>
                <div className='card-header'>
                    Carica un nuovo libro
                </div>
                <div className='card-body'>
                    <form method='POST'>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>Titolo</label>
                                <input type="text" className='form-control' name='title' required 
                                    onChange={e => setTitle(e.target.value)} value={title} />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Autore </label>
                                <input type="text" className='form-control' name='author' required 
                                    onChange={e => setAuthor(e.target.value)} value={author}/>
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Categoria</label>
                                <button className='form-control btn btn-secondary dropdown-toggle' type='button' 
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                        {category}
                                </button>
                                <ul id='addNewBookId' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li><a onClick={() => categoryField('saggio')} className='dropdown-item'>SAGGIO</a></li>
                                    <li><a onClick={() => categoryField('scienza')} className='dropdown-item'>SCIENZA</a></li>
                                    <li><a onClick={() => categoryField('informatica')} className='dropdown-item'>INFORMATICA</a></li>
                                    <li><a onClick={() => categoryField('diritto')} className='dropdown-item'>DIRITTO</a></li>
                                    <li><a onClick={() => categoryField('romanzo')} className='dropdown-item'>ROMANZO</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Lingua</label>
                                <button className='form-control btn btn-secondary dropdown-toggle' type='button' 
                                    id='dropdownMenuButton2' data-bs-toggle='dropdown' aria-expanded='false'>
                                        {language}
                                </button>
                                <ul id='addNewBookId' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li><a onClick={() => languageField('ITA')} className='dropdown-item'>Italiano</a></li>
                                    <li><a onClick={() => languageField('ENG')} className='dropdown-item'>Inglese</a></li>
                                    <li><a onClick={() => languageField('FRA')} className='dropdown-item'>Francese</a></li>
                                    <li><a onClick={() => languageField('SPA')} className='dropdown-item'>Spagnolo</a></li>
                                    <li><a onClick={() => languageField('JAP')} className='dropdown-item'>Giapponese</a></li>
                                </ul>
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Editore </label>
                                <input type="text" className='form-control' name='publisher' required 
                                    onChange={e => setPublisher(e.target.value)} value={publisher}/>
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> ISBN </label>
                                <input type="text" className='form-control' name='isbn' required 
                                    onChange={e => setIsbn(e.target.value)} value={isbn}/>
                            </div>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>Descrizione</label>
                            <textarea className='form-control' id='exampleFormControlTextarea1' rows={3} 
                                onChange={e => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>Copie</label>
                            <input type='number' className='form-control' name='Copies' required 
                                onChange={e => setCopies(Number(e.target.value))} value={copies}/>
                        </div>
                        <input type='file' accept="image/*" onChange={e => base64ConversionForImages(e)}/>
                        <input type='file' accept="application/pdf" onChange={e => base64ConversionForPdf(e)}/>
                        <div>
                            <button type='button' className='btn btn-primary mt-3' onClick={submitNewBook}>
                                Carica
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}