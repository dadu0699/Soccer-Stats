const userModel = require("../models/user.model");
const CryptoJS = require("crypto-js")
const s3 = require('../configs/s3');
const dispatchEmail = require('../configs/nodemail');

const { CRYPTO_KEY } = process.env;

iniciarSesion = (req, res) => {
    userModel.signin(req.body, (err, results) => {
        if (err) return response(res, 500, err);
        response(res, 200, results[0]);
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
        const { key } = await s3.itemUpload(req.body['photo']);
        req.body['genre'] = req.body['genre'] == 'F' ? 0 : 1;
        req.body['photo'] = 'https://grupof.s3.us-east-2.amazonaws.com/' + key
        req.body['password'] = CryptoJS.AES.encrypt(req.body['password'], CRYPTO_KEY).toString();
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
        if (err) return response(res, 500, err, '');
        results[0]['genre'] = results['genre'] ? 'M' : 'F';
        results[0]['age'] = calcularEdad(results[0]['birthday']);
        response(res, 200, results[0])
    })

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

module.exports = { obtenerPaises, crearUsuario, validarCuenta, obtenerPerfil, iniciarSesion };