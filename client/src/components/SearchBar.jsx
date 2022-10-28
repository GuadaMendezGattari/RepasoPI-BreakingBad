import React, {useState} from 'react';
import {useDispatch} from'react-redux';
import { getNameCharacters, getCharacters } from '../actions';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        dispatch(getNameCharacters(name));
        setName('');
    }

    function handleClick(e) {
        dispatch(getCharacters());
    }

    return (
        <div>
            <input type='text' placeholder='Buscar...' onChange={e => handleInputChange(e)} value={name}/>
            <button type='submit' onClick={e => handleSubmit(e)}>Buscar</button>
            <button onClick={e => handleClick(e)}>Volver a cargar todos los personajes</button>
        </div>
    );
}