const authModel = require("../models/auth.model");
const CryptoJS = require("crypto-js")
const { generateToken } = require('../helpers/jwt');

const key = CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
const iv = CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);

iniciarSesion = (req, res) => {
    req.body['password'] = CryptoJS.AES.encrypt(req.body['password'], key, {
        iv,
    }).toString();
    authModel.signin(req.body, async (err, results) => {
        if (err) return response(res, 500, err);
        if (!results[0]) return response(res, 500, [], 'Incorrect mail or password.');
        const payload = { id_usuario: results[0]['id_usuario'], id_rol: results[0]['id_rol'] }
        const token = await generateToken(payload);
        const statusAccount = results[0]['statusAccount']
        if (!results[0]['expire_date']) return response(res, 200, { token, statusAccount });
        const passwordExpired = verificarTiempo(results[0]['expire_date'])
        if (passwordExpired) return response(res, 200, [], 'Password Expired')
        response(res, 200, { token, statusAccount });
    });
}

validarCuenta = (req, res) => {
    authModel.validate(req.params, (err, results) => {
        if (err) return response(res, 500, err, 'Error al verificar correo');
        response(res, 200, [], 'Correo verificado')
    });
}

function verificarTiempo(expireDateString) {
    const today = new Date();
    const expireDate = new Date(expireDateString);
    const time = Math.abs(expireDate - today) / (1000 * 60);
    if (time > 2) return true
    return false
}

const response = (res, code, data, msj = '') => {
    res.status(code).send({ code, data, msj });
};

module.exports = {  iniciarSesion, validarCuenta };
