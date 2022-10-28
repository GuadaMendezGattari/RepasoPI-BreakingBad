import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className='App'>
            <h1>Breaking Bad</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    );
}