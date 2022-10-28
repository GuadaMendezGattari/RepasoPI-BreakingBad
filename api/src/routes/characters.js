const { Router } = require('express');
const {Character, Occupation} = require('../db');
const axios = require('axios');
const router = Router();


const getInfoApi = async () => {
    const charsApi = await axios.get('https://breakingbadapi.com/api/characters');
    const chars = await charsApi.data.map(el => {
        return {
            id: el.char_id,
            name: el.name,
            birthday: el.birthday,
            occupation: el.occupation,
            img: el.img,
            status: el.status,
            nickname: el.nickname,
            appearance: el.appearance
        }
        
    });
    return chars;
};

const getInfoDb = async () => {
    return await Character.findAll({include: Occupation});
            //attributes: ['name'],
            //through: {
            //    attributes: []
            //}
};

const getAllChars = async () => {
    const apiInfo = await getInfoApi();
    const dbInfo = await getInfoDb();
    const allChars = apiInfo.concat(dbInfo);
    return allChars;
};

router.get('/', async (req, res) => {
    let {name} = req.query;
    try {
        let chars = await getAllChars();
        chars = chars.map(el => {
            return {
                id: el.id,
                name: el.name,
                nickname: el.nickname,
                img: el.img,
                status: el.status,
                createdInDb: el.createdInDb
            }
        });
        if(name) {
            let forName = await chars.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            if(forName.length !== 0) return res.send(forName);
            return res.send({message: 'No hay personajes con ese nombre'});
        }
        return res.send(chars);
    } catch(e) {
        console.log(e);
    }
});


router.get('/:idPersonaje', async (req, res) => {
    let {idPersonaje} = req.params;
    let chars = await getAllChars();
    let charForId = chars.find(el => el.id.toString() === idPersonaje);
    res.send(charForId);
});

module.exports = router;