import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { backHome, getDetail } from '../actions';


export default function Detail() {
    const dispatch = useDispatch();
    let {id} = useParams();

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    const myCharacter = useSelector(s => s.detail);

    function handleBack(e) {
        dispatch(backHome());
    }

    return(
        <div>
            <div>
                <img src={myCharacter.img ? myCharacter.img : myCharacter.image} alt="" width='400px' height='400px'/>
                <h5>Soy {myCharacter.name}</h5>
                <h5>Me dicen: {myCharacter.nickname}</h5>
                <h5>Ocupaciones: {myCharacter.occupation ? myCharacter.occupation.join(', ') : myCharacter.occupations ? myCharacter.occupations.map(el => el.name).join(', ') : 'Se desconoce'}</h5>
                <h5>Status: {myCharacter.status}</h5>
                <h5>Cumpleaños: {myCharacter.birthday}</h5>
                <h5>Temporadas en las que aparece: {myCharacter.appearance ? myCharacter?.appearance.join(', ') : 'Se desconoce'}</h5>
            </div>
            <Link to='/home'><button onClick={e => handleBack(e)}>Volver</button></Link>
        </div>
    );
}