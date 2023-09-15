import BookModel from "../../../models/BookModel";

export const MyLibraryModal: React.FC<{ book: BookModel, mobile: boolean, returnBook: any,
    downloadBook: any }> = (props) => {
    return (
        <div className='modal fade' id={props.mobile ? `mobilemodal${props.book.id}` : 
            `modal${props.book.id}`} data-bs-backdrop='static' data-bs-keyboard='false' 
            aria-labelledby='staticBackdropLabel' aria-hidden='true' key={props.book.id}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='staticBackdropLabel'>
                                Gestisci
                            </h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='container'>
                                <div className='mt-3'>
                                    <div className='row'>
                                        <div className='col-2'>
                                            {props.book?.img ?
                                                <img src={props.book?.img} 
                                                    width='56' height='87' alt='Book'/>
                                                :
                                                <img src={require('./../../../Images/BooksImages/book.png')} 
                                                    width='56' height='87' alt='Book'/>
                                            }
                                        </div>
                                        <div className='col-10'>
                                            <h6>{props.book.author}</h6>
                                            <h4>{props.book.title}</h4>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className='list-group mt-3'>
                                        <button onClick={() => props.returnBook(props.book.id)} 
                                           data-bs-dismiss='modal' className='list-group-item list-group-item-action' 
                                           aria-current='true'>
                                            Annulla prenotazione
                                        </button>
                                        <button onClick={
                                            () => props.downloadBook(props.book.id)
                                        } 
                                            data-bs-dismiss='modal' 
                                            className='list-group-item list-group-item-action'>
                                            {
                                            'Download'    
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                                Chiudi
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    );
}