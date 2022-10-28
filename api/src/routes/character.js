const { Router } = require('express');
const {Character, Occupation} = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    let {id, name, nickname, birthday, status, img, createdInDb, occupation} = req.body;
    let char = await Character.create({id, name, nickname, birthday, status, img, createdInDb});
    let occDb = await Occupation.findAll({where: {name: occupation}});
    char.addOccupation(occDb);
    res.send('Personaje creado con exito');
});

module.exports = router;