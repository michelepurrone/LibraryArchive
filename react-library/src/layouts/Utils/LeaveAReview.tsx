import { useState } from 'react';
import { StarsReview } from './StarsReview';

export const LeaveAReview: React.FC<{ submitReview: any }> = (props) => {

    const [starInput, setStarInput] = useState(0);
    const [displayInput, setDisplayInput] = useState(false);
    const [reviewDescription, setReviewDescription] = useState('');

    function starValue(value: number) {
        setStarInput(value);
        setDisplayInput(true);
    }

    return (
        <div className='dropdown' style={{ cursor: 'pointer' }}>
            <h5 className='dropdown-toggle' id='dropdownMenuButton1' data-bs-toggle='dropdown'>
                Ti andrebbe di lasciare una valutazione?
            </h5>
            <ul id='submitReviewRating' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                <li><button onClick={() => starValue(0)} className='dropdown-item'>Zero</button></li>
                <li><button onClick={() => starValue(.5)} className='dropdown-item'>Mezza</button></li>
                <li><button onClick={() => starValue(1)} className='dropdown-item'>Una</button></li>
                <li><button onClick={() => starValue(1.5)} className='dropdown-item'>Una e mezza</button></li>
                <li><button onClick={() => starValue(2)} className='dropdown-item'>Due</button></li>
                <li><button onClick={() => starValue(2.5)} className='dropdown-item'>Due e mezza</button></li>
                <li><button onClick={() => starValue(3)} className='dropdown-item'>Tre</button></li>
                <li><button onClick={() => starValue(3.5)} className='dropdown-item'>Tre e mezza</button></li>
                <li><button onClick={() => starValue(4)} className='dropdown-item'>Quattro</button></li>
                <li><button onClick={() => starValue(4.5)} className='dropdown-item'>Quattro e mezza</button></li>
                <li><button onClick={() => starValue(5)} className='dropdown-item'>Cinque</button></li>
            </ul>
            <StarsReview rating={starInput} size={32}/>

            {displayInput && 
                <form method='POST' action='#'>
                    <hr/>

                    <div className='mb-3'>
                        <label className='form-label'>
                            Commento
                        </label>
                        <textarea className='form-control' id='submitReviewDescription' placeholder='...'
                            rows={3} onChange={e => setReviewDescription(e.target.value)}>
                        </textarea>
                    </div>

                    <div>
                        <button type='button' onClick={() => props.submitReview(starInput, reviewDescription)} className='btn btn-primary mt-3'>Submit Review</button>
                    </div>
                </form>
            }

        </div>
    );
}