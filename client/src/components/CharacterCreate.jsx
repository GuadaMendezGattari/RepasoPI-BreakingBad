import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {postCharacter, getOccupations} from '../actions/index';

function validate(input) {
    let errors = {};
    if(!input.name) errors.name = 'Se requiere un nombre';
    else if(/^\s*[a-zà-ÿ]+[\sa-zà-ÿ]*$/gi.test(input.name) === false) errors.name = 'El nombre no puede contener numeros o simbolos';
    if(!input.nickname) errors.nickname = 'Nickname debe ser completado';
    else if(/^\s*[a-zà-ÿ]+[\sa-zà-ÿ]*$/gi.test(input.name) === false) errors.name = 'El sobrenombre no puede contener numeros o simbolos';
    if(!input.birthday) errors.birthday = 'Complete el cumpleaños';
    if(!input.occupation.length) errors.occupation = 'Debe tener al menos una ocupacion';
    return errors;
}

export default function CharacterCreate() {
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name: '',
        nickname: '',
        birthday: '',
        status: '',
        image: '',
        occupation: []
    });
    const [errors, setErrors] = useState({
        name: 'Se requiere un nombre',
        nickname: 'Nickname debe ser completado',
        birthday: 'Complete el cumpleaños',
        occupation: 'Debe tener al menos una ocupacion'
    });

    useEffect(() => {
        dispatch(getOccupations());
    }, [dispatch]);

    const occupations = useSelector(s => s.occupations).sort((a, b) => {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelect(e) {
        if(e.target.value !== 'null') {
            setInput({
                ...input,
                occupation: [...input.occupation, e.target.value]
            });
    
            setErrors(validate({
                ...input,
                occupation: [...input.occupation, e.target.value]
            }));
        }
    }

    function handleSubmit(e) {
        if(!errors.name &&
            !errors.nickname &&
            !errors.birthday &&
            !errors.occupation) {
            dispatch(postCharacter({
                name: input.name,
                nickname: input.nickname,
                birthday: `${input.birthday}`,
                status: input.status,
                image: input.image,
                occupation: input.occupation
            }));
            alert('Personaje creado');
            setInput({
                name: '',
                nickname: '',
                birthday: '',
                status: '',
                image: '',
                occupation: []
            });
        } else {
            e.preventDefault();
            alert('Debe completar con los datos correctamente');
        }
    }

    return(
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Cree su personaje</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input type="text" value={input.name} name="name" onChange={e => handleChange(e)}/>
                    {
                        errors.name && (
                            <p className='error'>{errors.name}</p>
                        )
                    }
                </div>
                <div>
                    <label>Sobrenombre: </label>
                    <input type="text" value={input.nickname} name='nickname' onChange={e => handleChange(e)}/>
                    {
                        errors.nickname && (
                            <p className='error'>{errors.nickname}</p>
                        )
                    }
                </div>
                <div>
                    <label>Cumpleaños: </label>
                    <input type='date' value={input.birthday} name='birthday' onChange={e => handleChange(e)}/>
                    {
                        errors.birthday && (
                            <p className='error'>{errors.birthday}</p>
                        )
                    }
                </div>
                <div>
                    <label>Imagen: </label>
                    <input type="text" value={input.image} name='image' onChange={e => handleChange(e)}/>
                </div>
                <div>
                    <label>Status: </label>
                    <select onChange={e => handleChange(e)} name='status'>
                        <option value="null" key={0}>Seleccione</option>
                        <option value="Alive" key={1}>Alive</option>
                        <option value="Deceased" key={2}>Deceased</option>
                        <option value="Presumed dead" key={3}>Presumed dead</option>
                        <option value="Unknown" key={4}>Unknown</option>
                    </select>
                </div>
                <div>
                    <select onChange={e => handleSelect(e)}>
                        <option value="null" key={0}>Seleccione</option>
                        {
                            occupations && occupations.map(el => {
                                return (
                                    <option value={el.name} key={occupations.id}>{el.name}</option>
                                );
                            })
                        }
                    </select>
                    {
                        input.occupation && (
                            <p>{input.occupation.join(', ')}</p>
                        )
                    }
                    {
                        errors.occupation && (
                            <p className='error'>{errors.occupation}</p>
                        )
                    }
                </div>
                <button type='submit'>Crear personaje</button>
            </form>
        </div>
    );
} 