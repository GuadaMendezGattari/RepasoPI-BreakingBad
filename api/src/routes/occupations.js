const { Router } = require('express');
const {Occupation} = require('../db');
const router = Router();

router.get('/', async (req, res) => {
    const occs = await Occupation.findAll();
    console.log(occs);
    res.send(occs);
});

module.exports = router;