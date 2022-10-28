import React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getCharacters } from '../actions';
import {Link} from 'react-router-dom';
import SearchBar from './SearchBar';
import Card from './Card';
import Filtrado from './Filtrado';
import Ordenamiento from './Ordenamiento';
import Paginado from './Paginado';

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCharacters());
    }, [dispatch]);

    const allChars = useSelector(state => state.characters);

    const [currentPage, setCurrentPage] = useState(1);
    const charsPerPage = 6;
    const indexLastChar = currentPage * charsPerPage;
    const indexFirstChar = indexLastChar - charsPerPage;
    const currentChars = allChars.slice(indexFirstChar, indexLastChar);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Link to='/createCharacter'><button>Crear personaje</button></Link>
            <h1>Personajes de breaking bad</h1>
            <div>
                <SearchBar/>
                <Filtrado/>
                <Ordenamiento/>
                <Paginado charsPerPage={charsPerPage} allChars={allChars.length} paginado={paginado}/>
            </div>
            {
                currentChars?.length ?
                currentChars?.map(el => {
                    return (
                        <div key={el.id}>
                            <Card id={el.id} name={el.name} img={el.img} nickname={el.nickname}/>
                        </div>
                    );
                }) :
                <p>Loading...</p>
            }
        </div>
    );
}