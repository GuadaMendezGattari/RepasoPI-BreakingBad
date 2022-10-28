import axios from 'axios';

export function getCharacters() {
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/characters');
        return dispatch({type: 'GET_CHARACTERS', payload: json.data});
    }
}

export function getCharactersByStatus(payload) {
    return {type: 'FILTER_BY_STATUS', payload};
}

export function getCharactersByCreated(payload) {
    return {type: 'FILTER_CREATED', payload};
}

export function orderByName(payload) {
    return{type: 'ORDER_BY_NAME', payload};
}

export function getNameCharacters(name) {
    return async function(dispatch) {
        let json = await axios.get(`http://localhost:3001/characters?name=${name}`);
        return dispatch({type: 'GET_NAME_CHARACTERS', payload: json.data});
    }
}

export function getOccupations() {
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/occupations');
        return dispatch({type: 'GET_OCCUPATIONS', payload: json.data});
    }
}

export function postCharacter(payload) {
    return async function(dispatch) {
        let json = await axios.post('http://localhost:3001/character', payload).then(response => { 
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });
        return json;
    }
}

export function getDetail(id) {
    return async function(dispatch) {
        let json = await axios.get(`http://localhost:3001/characters/${id}`);
        return dispatch({type: 'GET_DETAIL', payload: json.data})
    }
}

export function backHome() {
    return {type: 'BACK_HOME'}
}