const express = require('express');
const calculoController = require('../controllers/calculo');
const router = express.Router();

router.post(
    '/resultado',
    calculoController.calculo,
    calculoController.mediaOutros,
    (req, res) => {
        res.render('calculo', {
            calculoUsuario: req.calculoUsuario,
            mediaOutros: req.mediaOutros,
        });
    },
);
module.exports = router;
