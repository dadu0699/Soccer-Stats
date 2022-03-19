const userModel = require("../models/user.model");
const CryptoJS = require("crypto-js")
const s3 = require('../configs/s3');
const dispatchEmail = require('../configs/nodemail');
const { generateToken } = require('../helpers/jwt');

const key = CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
const iv = CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);

iniciarSesion = (req, res) => {
    req.body['password'] = CryptoJS.AES.encrypt(req.body['password'], key, {
        iv,
    }).toString();
    userModel.signin(req.body, async (err, results) => {
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

obtenerPaises = (req, res) => {
    userModel.getCountry(req, (err, results) => {
        if (err) return response(res, 500, err);
        response(res, 200, results);
    });
};

crearUsuario = async (req, res) => {
    try {
        const { keyS3 } = await s3.itemUpload(req.body['photo']);
        req.body['photo'] = 'https://grupof.s3.us-east-2.amazonaws.com/' + keyS3
        req.body['genre'] = req.body['genre'] == 'F' ? 0 : 1;
        req.body['password'] = CryptoJS.AES.encrypt(req.body['password'], key, {
            iv,
        }).toString();
        userModel.create(req.body, (err, results) => {
            if (err) return response(res, 500, err);
            dispatchEmail(req.body['email'], 'Verify Email', results['insertId']);
            response(res, 200, results);
        });
    } catch (error) {
        return response(res, 500, error);
    }
}

validarCuenta = (req, res) => {
    userModel.validate(req.params, (err, results) => {
        if (err) return response(res, 500, err, 'Error al verificar correo');
        response(res, 200, [], 'Correo verificado')
    });
}

obtenerPerfil = (req, res) => {
    userModel.getProfile(req.params, (err, results) => {
        if (err) return response(res, 500, err);
        results[0]['genre'] = results['genre'] ? 'M' : 'F';
        results[0]['age'] = calcularEdad(results[0]['birthday']);
        response(res, 200, results[0])
    })

}

actualizarPerfil = async (req, res) => {
    if (req.body['password'])
        req.body['password'] = CryptoJS.AES.encrypt(req.body['password'], key, {
            iv,
        }).toString();
    if (req.body['photo']) {
        const { keyS3 } = await s3.itemUpload(req.body['photo']);
        req.body['photo'] = 'https://grupof.s3.us-east-2.amazonaws.com/' + keyS3
    }
    if (req.body['genre']) req.body['genre'] = req.body['genre'] == 'F' ? 0 : 1;

    userModel.update(req.body, (err, results) => {
        if (err) return response(res, 500, err, 'Error al actualizar datos')
        response(res, 200, results, [], 'Datos actualizados')
    });
}

function verificarTiempo(expireDateString) {
    const today = new Date();
    const expireDate = new Date(expireDateString);
    const time = Math.abs(expireDate - today) / (1000 * 60);
    if (time > 2) return true
    return false
}

function calcularEdad(fechaNacimiento) {
    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const response = (res, code, data, msj = '') => {
    res.status(code).send({ code, data, msj });
};

module.exports = { obtenerPaises, crearUsuario, validarCuenta, obtenerPerfil, iniciarSesion, actualizarPerfil };