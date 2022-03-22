const authModel = require("../models/auth.model");
const CryptoJS = require("crypto-js")
const { generateToken } = require('../helpers/jwt');

const key = CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
const iv = CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);

const iniciarSesion = (req, res) => {
    req.body['password'] = CryptoJS.AES.encrypt(req.body['password'], key, {
        iv,
    }).toString();
    console.log(req.body['password']);
    authModel.signin(req.body, async (err, results) => {
        if (err) return response(res, 400, 'Error de autenticación.', [err]);
        if (!results[0]) return response(res, 400, 'Error de autenticación.', []);
        const payload = { id_usuario: results[0]['id_usuario'], id_rol: results[0]['id_rol'] }
        const token = await generateToken(payload);
        const id_status = results[0]['id_status']
        if (!results[0]['expire_date']) return response(res, 200, '', { token, id_status });
        const passwordExpired = verificarTiempo(results[0]['expire_date'])
        if (passwordExpired) return response(res, 400, 'Error de autenticación. Contraseña expirada', [])
        response(res, 200, '', { token, id_status });
    });
}

const validarCuenta = (req, res) => {
    authModel.validate(req.query, (err, results) => {
        if (err) return response(res, 400,  'Error al verificar correo.', [err]);
        response(res, 200,'Correo verificado con éxito.', [] )
    });
}

function verificarTiempo(expireDateString) {
    const today = new Date();
    const expireDate = new Date(expireDateString);
    const time = Math.abs(expireDate - today) / (1000 * 60);
    if (time > 2) return true
    return false
}

const response = (res, code, msg, data) => {
    res.status(code).send({ status: code, msg, data });
};

module.exports = {  iniciarSesion, validarCuenta };
