const express = require('express');
const router = express.Router();
const historicoController = require('../controllers/historico');

router.get('/historico', historicoController.mostrarHistorico);

module.exports = router;
