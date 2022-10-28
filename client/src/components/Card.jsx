import React from "react";
import {Link} from 'react-router-dom';

export default function Card({id, name, img, nickname}) {
    return (
        <div>
            <img src={img} alt="" width='200px' height='250px'/>
            <Link to={`/characters/${id}`}><h3>{name}</h3></Link>
            <h5>{nickname}</h5>
        </div>
    );
}