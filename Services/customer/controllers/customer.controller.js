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
    req.body['gender'] = req.body['gender'] == 'F' ? 0 : 1;
    req.body['password'] = CryptoJS.AES.encrypt(req.body['password'], key, {
      iv,
    }).toString();
    customerModel.create(req.body, (err, results) => {
      if (err) return response(res, 400, 'Error al guardar el usuario.', [err]);
      dispatchEmail(req.body['email'], 'Verify Email', results['insertId']);
      response(res, 200, 'Usuario creado con éxito.', results);
    });
  } catch (error) {
    return response(res, 400, 'Error al guardar el usuario.', [error]);
  }
}

obtenerPerfil = (req, res) => {
  customerModel.getProfile(req.query, (err, results) => {
    if (err) return response(res, 400, 'Error al obtener el usuario.', [err]);
    results[0]['gender'] = results['gender'] ? 'M' : 'F';
    results[0]['age'] = calcularEdad(results[0]['birth_date']);
    response(res, 200, 'Usuario obtenido con éxito.', results)
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
  if (req.body['gender']) req.body['gender'] = req.body['gender'] == 'F' ? 0 : 1;

  customerModel.update(req.body, (err, results) => {
    if (err) return response(res, 400, 'Error al actualizar el usuario.', [err])
    response(res, 200, 'Usuario actualizado con éxito.', results)
  });
}

eliminarCuenta = (req, res) => {
  customerModel.deleteAccount(req.body, (err, results) => {
    if (err) return response(res, 400, 'Error al eliminar el usuario.', [err])
    response(res, 200, 'Usuario eliminado con éxito.', results)
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

const response = (res, code, msg, data) => {
  res.status(code).send({ status: code, msg, data });
};

module.exports = { crearUsuario, obtenerPerfil, actualizarPerfil, eliminarCuenta };
