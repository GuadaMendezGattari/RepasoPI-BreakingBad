import { useDispatch } from 'react-redux';
import React from 'react-router-dom';
import { orderByName } from '../actions';

export default function Ordenamiento() {
    const dispatch = useDispatch();

    function handleSort(e) {
        dispatch(orderByName(e.target.value));
    }

    return (
        <div>
            <select onChange={e => handleSort(e)}>
                <option value="All">Predeterminado</option>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
            </select>
        </div>
    );
}