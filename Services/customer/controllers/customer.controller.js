const customerModel = require("../models/customer.model");
const CryptoJS = require("crypto-js")
const s3 = require('../configs/s3');
const dispatchEmail = require('../configs/nodemail');

const key = CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
const iv = CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);

crearUsuario = async (req, res) => {
  try {
    const { keyS3 } = await s3.itemUpload(req.body['photo']);
    req.body['photo'] = 'https://grupof.s3.us-east-2.amazonaws.com/' + keyS3
    req.body['genre'] = req.body['genre'] == 'F' ? 0 : 1;
    req.body['password'] = CryptoJS.AES.encrypt(req.body['password'], key, {
      iv,
    }).toString();
    customerModel.create(req.body, (err, results) => {
      if (err) return response(res, 500, err);
      dispatchEmail(req.body['email'], 'Verify Email', results['insertId']);
      response(res, 200, results);
    });
  } catch (error) {
    return response(res, 500, error);
  }
}

obtenerPerfil = (req, res) => {
  customerModel.getProfile(req.params, (err, results) => {
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

  customerModel.update(req.body, (err, results) => {
    if (err) return response(res, 500, err, 'Error al actualizar datos')
    response(res, 200, results, 'Datos actualizados')
  });
}

eliminarCuenta = (req, res) => {
  customerModel.deleteAccount(req.body, (err, results) => {
    if (err) return response(res, 500, err)
    response(res, 200, results)
  });
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

module.exports = { obtenerPaises, crearUsuario, validarCuenta, obtenerPerfil, iniciarSesion, actualizarPerfil, eliminarCuenta };
