const userModel = require("../models/user.model");
const CryptoJS = require("crypto-js")
const s3 = require('../configs/s3');

const { CRYPTO_KEY } = process.env;


obtenerPaises = (req, res) => {
    userModel.getCountry(req, (err, results) => {
        if (err) return response(res, 500, err);
        response(res, 200, results);
    });
};

crearUsuario = async (req, res) => {
    try{
        const { key } = await s3.itemUpload(req.body['photo']);
        req.body['photo'] = 'https://grupof.s3.us-east-2.amazonaws.com/'+key
        req.body['password'] = CryptoJS.AES.encrypt(req.body['password'], CRYPTO_KEY).toString();
        userModel.create(req.body, (err, results) => {
            if (err) return response(res, 500, err);
            response(res,200, results);
        });
    }catch (error){
        return response(res, 500, error);
    }

}

validarCuenta = (req, res) =>{
    userModel.validate(req.params, (err, results) => {
        if (err) return response(res,500,err);
        response(res, 200, results)
    });
}

const response = (res, code, data) => {
    res.status(code).send({ code, data });
};

module.exports = { obtenerPaises, crearUsuario, validarCuenta };