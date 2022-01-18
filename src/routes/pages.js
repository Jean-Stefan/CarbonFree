const route = require('color-convert/route');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const historicoController = require('../controllers/historico');
const calculoController = require('../controllers/calculo');

router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('home', {
        usuario: req.usuario,
    });
});

router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get(
    '/perfil',
    authController.isLoggedIn,
    calculoController.mediaUsuario,
    (req, res) => {
        if (req.usuario) {
            res.render('perfil', {
                usuario: req.usuario,
                nascimento: req.nascimento,
                mediaUsuario: req.mediaUsuario,
            });
        } else {
            res.redirect('/login');
        }
    },
);

router.get('/calculo', authController.isLoggedIn, (req, res) => {
    if (req.usuario) {
        res.render('calculo', {
            usuario: req.usuario,
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/sugestoes', authController.isLoggedIn, (req, res) => {
    if (req.usuario) {
        res.render('sugestoes', {
            usuario: req.usuario,
        });
    } else {
        res.redirect('/login');
    }
});

router.get(
    '/historico',
    authController.isLoggedIn,
    historicoController.mostrarHistorico,
    (req, res) => {
        if (req.usuario) {
            res.render('historico', {
                usuario: req.usuario,
                historico: req.historico,
            });
        } else {
            res.redirect('/login');
        }
    },
);

module.exports = router;
