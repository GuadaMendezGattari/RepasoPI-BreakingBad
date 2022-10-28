import React from "react";
import { useDispatch } from "react-redux";
import { getCharactersByCreated, getCharactersByStatus } from "../actions";

export default function Filtrado() {
    const dispatch = useDispatch();

    function handleFilterStatus(e) {
        dispatch(getCharactersByStatus(e.target.value));
    } 

    function handleFilterCreated(e) {
        dispatch(getCharactersByCreated(e.target.value));
    }

    return (
        <div>
            <select onChange={(e) => handleFilterStatus(e)}>
                <option value="All">Todos</option>
                <option value="Alive">Vivo</option>
                <option value="Deceased">Muerto</option>
                <option value="Presumed dead">Probablemente muerto</option>
                <option value="Unknown">Desconocido</option>
            </select>
            <select onChange={(e) => handleFilterCreated(e)}>
                <option value="All">Todos</option>
                <option value="created">Creados</option>
                <option value="api">Existentes</option>
            </select>
        </div>
    );
}