const userModel = require("../models/user.model");
const CryptoJS = require("crypto-js")

const { CRYPTO_KEY } = process.env;


obtenerPaises = (req, res) => {
    userModel.getCountry(req, (err, results) => {
        if (err) return response(res, 500, err);
        response(res, 200, results);
    });
};

crearUsuario = (req, res) => {
    req.body['password'] = CryptoJS.AES.encrypt(req.body['password'], CRYPTO_KEY).toString();
    userModel.create(req.body, (err, results) => {
        if (err) return response(res, 500, err);
        response(res,200, results);
    })


}

const response = (res, code, data) => {
    res.status(code).send({ code, data });
};

module.exports = { obtenerPaises, crearUsuario };