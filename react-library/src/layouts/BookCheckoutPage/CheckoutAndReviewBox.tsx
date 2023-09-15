import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";
import { LeaveAReview } from "../Utils/LeaveAReview";

export const CheckoutAndReviewBox: React.FC<{ book: BookModel | undefined, mobile: boolean, 
    currentMyLibraryCount: number, isAuthenticated: any, isCheckedOut: boolean, 
    checkoutBook: any, isReviewLeft: boolean, submitReview: any }> = (props) => {

    function buttonRender() {
        if (props.isAuthenticated) {
            if (!props.isCheckedOut && props.currentMyLibraryCount < 5) {
                return (<button onClick={() => props.checkoutBook()} className='btn btn-success btn-lg'>Prenota</button>)
            } else if (props.isCheckedOut) {
                return (<p><b>Titolo aggiunto alla tua libreria!</b></p>)
            } else if (!props.isCheckedOut) {
                return (<p className='text-danger'>Troppi titoli prenotati, restituiscili o scaricali dalla tua libreria.</p>)
            }
        }
        return (<Link to={'/login'} className='btn btn-success btn-lg'>Iscriviti</Link>)
    }

    function reviewRender() {
        if (props.isAuthenticated && !props.isReviewLeft) {
            return(
            <p>
                <LeaveAReview submitReview={props.submitReview}/>
            </p>
            )
        } else if (props.isAuthenticated && props.isReviewLeft) {
            return(
            <p>
                <b>Grazie per aver lasciato una valutazione!</b>
            </p>
            )
        }
        return (
        <div>
            <hr/>
            <p>Iscriviti per poter lasciare una valutazione.</p>
        </div>
        )
    }

    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        Al momento hai già prenotato
                        <b> {props.currentMyLibraryCount} titoli su 5 </b>
                    </p>
                    <hr />
                    {props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                        <h4 className='text-success'>
                            Disponibile
                        </h4>
                        :
                        <h4 className='text-danger'>
                            Lista d'attesa
                        </h4>
                    }
                    <div className='row'>
                        <p className='col-6 lead'>
                            <b>{props.book?.copies} </b>
                            copie totali
                        </p>
                        <p className='col-6 lead'>
                            <b>{props.book?.copiesAvailable} </b>
                            disponibili
                        </p>
                    </div>
                </div>
                {buttonRender()}
                <hr />
                <p className='mt-3'>
                    Le copie totali e quelle disponibili potrebbero variare.
                </p>
                {reviewRender()}
            </div>
        </div>
    );
}