const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({path: './.env'});

const app = express();

const db = mysql.createPool({
    connectionLimit: process.env.CONNECTION_LIMIT,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

db.getConnection((error, connection) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Banco de dados MySQL conectado.');
    }
});

//Define routes.
app.use('/', require('./routes/pages.js'));
app.use('/auth', require('./routes/auth.js'));
app.use('/calculo', require('./routes/calculo.js'));
app.use('/historico', require('./routes/historico.js'));

port = process.env.PORT || 3306;

app.listen(port, () => {
    console.log(`Servidor iniciado na porta: ${port}`);
});
