import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const Heros = () => {

    const { authState } = useOktaAuth();

    return (
        <div>
            <div className='d-none d-lg-block'>
                <div className='row g-0 mt-5'>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-left'></div>
                    </div>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Che libro ti ha catturato di recente?</h1>
                            <p className='lead'>
                                Quali libri hai avuto il piacere di leggere di recente?
                                Sei alla ricerca di nuove competenze o desideriate approfondire quelle già acquisite?
                                È qui che trovi i migliori suggerimenti!
                            </p>
                            {authState?.isAuthenticated ?
                                <Link type='button' className='btn main-color btn-lg text-white'
                                    to='search'>Scopri i libri più rilevanti </Link>
                                :
                                <Link className='btn main-color btn-lg text-white' to='/login'>Iscriviti</Link>
                            }
                        </div>
                    </div>
                </div>
                <div className='row g-0'>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Esplora una collezione in continua evoluzione!</h1>
                            <p className='lead'>
                                Grazie al contributo degli utenti la libreria è in continuo mutamento:
                                iscriviti e scarica ciò che ti ha più colpito!
                                L'obiettivo è fornire una corposa selezione di libri per chi desidera immergersi nella lettura!
                            </p>
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-right'></div>
                    </div>
                </div>
            </div>

            {/* Mobile Heros */}
            <div className='d-lg-none'>
                <div className='container'>
                    <div className='m-2'>
                        <div className='col-image-left'></div>
                        <div className='mt-2'>
                            <h1>Che libro ti ha catturato di recente?</h1>
                            <p className='lead'>
                                Quali libri hai avuto il piacere di leggere di recente?
                                Sei alla ricerca di nuove competenze o desideriate approfondire quelle già acquisite?
                                È qui che trovi i migliori suggerimenti!
                            </p>
                            {authState?.isAuthenticated ?
                                <Link type='button' className='btn main-color btn-lg text-white'
                                    to='search'>Scopri i libri più rilevanti</Link>
                                :
                                <Link className='btn main-color btn-lg text-white' to='/login'>Iscriviti</Link>
                            }
                        </div>
                    </div>
                    <div className='m-2'>
                        <div className='col-image-right'></div>
                        <div className='mt-2'>
                            <h1>Esplora una collezione in continua evoluzione!</h1>
                            <p className='lead'>
                                Grazie al contributo degli utenti la libreria è in continuo mutamento:
                                iscriviti e scarica ciò che ti ha più colpito!
                                L'obiettivo è fornire una corposa selezione di libri per chi desidera immergersi nella lettura!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}