const mysql = require('mysql');
const {connect} = require('../routes/auth');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const {Json} = require('sequelize/dist/lib/utils');

const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

exports.mostrarHistorico = async (req, res, next) => {
    const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET,
    );
    db.getConnection((error, connection) => {
        if (error) throw error;
        connection.query(
            `SELECT *, DATE_FORMAT(dataQuestionario, '%d/%m/%Y %H:%i:%s') as data FROM questionario WHERE usuario_idUsuario = ?`,
            [decoded.idUsuario],
            (err, rows) => {
                if (!err) {
                    console.log(rows);
                    req.historico = rows;
                    next();
                }
            },
        );
        connection.release();
    });
};
