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

function calcular(
    tv,
    banho,
    celular,
    computador,
    game,
    carro,
    moto,
    onibus,
    metro,
    lixo,
) {
    valorTv = Number(tv) * 0.2 * 0.11;
    valorBanho = Number(banho) * 0.833 * 0.11;
    valorCelular = Number(celular) * 0.173;
    valorComputador = Number(computador) * 0.35 * 0.11;
    valorGame = Number(game) * 0.22 * 0.11;

    valorCarro = Number(carro) * 0.37;
    valorMoto = Number(moto) * 0.13;
    valorOnibus = Number(onibus) * 0.06;
    valorMetro = Number(metro) * 0.1;

    valorLixo = Number(lixo);

    calculo =
        (valorTv +
            valorBanho +
            valorCelular +
            valorComputador +
            valorGame +
            valorCarro +
            valorMoto +
            valorOnibus +
            valorMetro) *
            30 +
        valorLixo;
    return calculo;
}

exports.calculo = async (req, res, next) => {
    const {
        input_tv,
        input_banho,
        input_celular,
        input_computador,
        input_game,
        input_carro,
        input_moto,
        input_onibus,
        input_metro,
        input_lixo,
    } = req.body;

    const resultado = await calcular(
        input_tv,
        input_banho,
        input_celular,
        input_computador,
        input_game,
        input_carro,
        input_moto,
        input_onibus,
        input_metro,
        input_lixo,
    );
    const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET,
    );
    db.getConnection((error, connection) => {
        if (error) throw error;
        connection.query(
            'INSERT INTO questionario SET ?',
            {
                dataQuestionario: new Date(),
                tempoBanho: input_banho,
                tempoCelular: input_celular,
                tempoTv: input_tv,
                tempoComputador: input_computador,
                tempoVG: input_game,
                kmCarro: input_carro,
                kmMoto: input_moto,
                kmOnibus: input_onibus,
                kmMetro: input_metro,
                lixo: input_lixo,
                usuario_idUsuario: [decoded.idUsuario],
                resultadoCalculo: resultado,
            },
            async (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(results);
                    req.calculoUsuario = `${Math.round(resultado)
                        .toString()
                        .replace('.', ',')} kg(s)/mês`;
                    return await next();
                }
            },
        );
    });
};

exports.mediaOutros = async (req, res, next) => {
    db.getConnection((error, connection) => {
        if (error) throw error;
        connection.query(
            `SELECT avg(media) FROM (SELECT usuario_idUsuario, avg(resultadoCalculo) as media FROM questionario GROUP BY usuario_idUsuario) TB`,
            (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(results);
                    const mediaJSON = JSON.parse(results[0]['avg(media)']);
                    req.mediaOutros = `${Math.round(mediaJSON)
                        .toString()
                        .replace('.', ',')} kg(s)/mês`;
                    return next();
                    // return res.render('calculo', {
                    //     mediaOutros: `${Math.round(mediaJSON)
                    //         .toString()
                    //         .replace('.', ',')} kg(s)/mês`,
                    //     calculoUsuario: `${Math.round(resultado)
                    //         .toString()
                    //         .replace('.', ',')} kg(s)/mês`,

                    // });
                }
            },
        );
        connection.release();
    });
};

exports.mediaUsuario = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            //1) verificar o token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET,
            );
            console.log(decoded);
            //2)verificar se o usuario ainda existe
            db.getConnection((error, connection) => {
                if (error) throw error;
                connection.query(
                    `SELECT avg(resultadoCalculo) FROM questionario WHERE usuario_idUsuario = ?`,
                    [decoded.idUsuario],
                    (error, result) => {
                        console.log(result);
                        if (!result) {
                            return next();
                        }
                        const mediaUsuarioJSON = JSON.parse(
                            result[0]['avg(resultadoCalculo)'],
                        );
                        req.mediaUsuario = `${Math.round(mediaUsuarioJSON)
                            .toString()
                            .replace('.', ',')} kg(s)/mês`;
                        return next();
                    },
                );
                connection.release();
            });
        } catch (error) {
            console.log(error);
            return await next();
        }
    } else {
        await next();
    }
};
