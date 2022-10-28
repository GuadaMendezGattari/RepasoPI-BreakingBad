const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const chars = require('./characters');
const occs = require('./occupations');
const char = require('./character');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/characters', chars);
router.use('/occupations', occs);
router.use('/character', char);

module.exports = router;
