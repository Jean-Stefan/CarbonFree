const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {promisify} = require('util');

const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

exports.cadastro = async (req, res) => {
    console.log(req.body);
    const {nome, dtnasc, email, senha, confirmar, nivel} = req.body;
    db.getConnection((error, connection) => {
        if (error) throw error;
        connection.query(
            'SELECT email from usuario WHERE email = ?',
            [email],
            async (error, results) => {
                if (error) {
                    console.log(error);
                }
                if (results.length > 0) {
                    return res.render('cadastro', {
                        mensagem: 'Esse e-mail já foi cadastrado.',
                    });
                } else if (senha !== confirmar) {
                    return res.render('cadastro', {
                        mensagem: 'As senhas não conferem.',
                    });
                }

                let hashedPassword = await bcrypt.hash(senha, 8);
                console.log(hashedPassword);
                connection.query(
                    'INSERT INTO usuario SET ?',
                    {
                        nome: nome,
                        email: email,
                        dataNasc: dtnasc,
                        dataCadastro: new Date(),
                        nivel: nivel,
                        senha: hashedPassword,
                    },
                    (error, results) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(results);
                            return res.render('cadastro', {
                                mensagem: 'Usuário cadastrado com sucesso!',
                            });
                        }
                    },
                );
            },
        );
        connection.release();
    });
};

exports.login = async (req, res) => {
    try {
        const {email, senha} = req.body;
        if (!email || !senha) {
            return res.status(400).render('login', {
                mensagem: 'Digite um e-mail e senha.',
            });
        }
        db.getConnection((error, connection) => {
            if (error) throw error;
            connection.query(
                'SELECT * FROM usuario WHERE email = ?',
                [email],
                async (error, results) => {
                    console.log(results);
                    if (
                        !results ||
                        !(await bcrypt.compare(senha, results[0].senha))
                    ) {
                        res.status(401).render('login', {
                            mensagem: 'E-mail ou senha incorretos.',
                        });
                    } else {
                        const idUsuario = results[0].idUsuario;
                        const token = jwt.sign(
                            {idUsuario},
                            process.env.JWT_SECRET,
                            {
                                expiresIn: process.env.JWT_EXPIRES_IN,
                            },
                        );
                        console.log('O token é: ' + token);
                        const cookieOptions = {
                            expires: new Date(
                                Date.now() +
                                    process.env.JWT_COOKIE_EXPIRES *
                                        24 *
                                        60 *
                                        60 *
                                        1000,
                            ),
                            httpOnly: true,
                        };
                        res.cookie('jwt', token, cookieOptions);
                        res.status(200).redirect('/');
                    }
                },
            );
            connection.release();
        });
    } catch (error) {
        console.log(error);
    }
};

exports.isLoggedIn = async (req, res, next) => {
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
                    `SELECT *, DATE_FORMAT(dataNasc, '%d/%m/%Y') as data FROM usuario WHERE idUsuario = ?`,
                    [decoded.idUsuario],
                    (error, result) => {
                        console.log(result);
                        if (!result) {
                            return next();
                        }

                        const dataConvertida = result[0].data;
                        req.usuario = result[0];
                        req.nascimento = dataConvertida;
                        return next();
                    },
                );
                connection.release();
            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        next();
    }
};

exports.logout = async (req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true,
    });
    res.status(200).redirect('/');
};
