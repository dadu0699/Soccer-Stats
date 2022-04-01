const CryptoJS = require('crypto-js');

const customerModel = require('../models/customer.model');
const dispatchEmail = require('../configs/nodemail');
const s3 = require('../configs/s3');

const keyCrypto = CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
const iv = CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);

const crearUsuario = async (req, res) => {
  try {
    const { key } = await s3.itemUpload(req.body['photo']);

    req.body['photo'] = 'https://grupof.s3.us-east-2.amazonaws.com/' + key;
    // req.body['gender'] = req.body['gender'] == 'F' ? 0 : 1;
    req.body['password'] = CryptoJS.AES.encrypt(
      req.body['password'],
      keyCrypto,
      { iv }
    ).toString();

    customerModel.create(req.body, (err, results) => {
      if (err) return response(res, 400, 'Error al guardar el usuario.', [err]);

      dispatchEmail(req.body['email'], 'Verify Email', results['insertId']);
      response(res, 200, 'Usuario creado con éxito.', [results]);
    });
  } catch (error) {
    return response(res, 400, 'Error al guardar el usuario.', [error]);
  }
};

const obtenerPerfil = (req, res) => {
  if (req.query['id'] != req.user['id_user'])
    return res.status(401).send({ status: 401, msg: 'Unauthorized', data: [] });

  customerModel.getProfile(req.query, (err, results) => {
    if (err || results.length < 1)
      return response(res, 400, 'Error al obtener el usuario.', [err]);

    results[0]['gender'] = results['gender'] ? 'F' : 'M';
    results[0]['age'] = calcularEdad(results[0]['birth_date']);

    response(res, 200, 'Usuario obtenido con éxito.', results);
  });
};

const actualizarPerfil = async (req, res) => {
  if (req.body['id'] != req.user['id_user'])
    return res.status(401).send({ status: 401, msg: 'Unauthorized', data: [] });

  req.body['password'] =
    req.body['password'] != undefined ? req.body['password'] : '';

  if (req.body['password'] != '') {
    req.body['password'] = CryptoJS.AES.encrypt(
      req.body['password'],
      keyCrypto,
      { iv }
    ).toString();
  }

  req.body['photo'] = req.body['photo'] != undefined ? req.body['photo'] : '';
  if (req.body['photo'] != '') {
    const { key } = await s3.itemUpload(req.body['photo']);
    req.body['photo'] = 'https://grupof.s3.us-east-2.amazonaws.com/' + key;
  }

  // req.body['gender'] = req.body['gender'] == 'F' ? 0 : 1;

  customerModel.update(req.body, (err, results) => {
    if (err)
      return response(res, 400, 'Error al actualizar el usuario.', [err]);

    response(res, 200, 'Usuario actualizado con éxito.', [results]);
  });
};

const eliminarCuenta = (req, res) => {
  if (req.body['id'] != req.user['id_user'])
    return res.status(401).send({ status: 401, msg: 'Unauthorized', data: [] });

  customerModel.deleteAccount(req.body, (err, results) => {
    if (err) return response(res, 400, 'Error al eliminar el usuario.', [err]);

    response(res, 200, 'Usuario eliminado con éxito.', [results]);
  });
};

const calcularEdad = (fechaNacimiento) => {
  const today = new Date();
  const birthDate = new Date(fechaNacimiento);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const response = (res, code, msg, data) => {
  res.status(code).send({ status: code, msg, data });
};

module.exports = {
  crearUsuario,
  obtenerPerfil,
  actualizarPerfil,
  eliminarCuenta,
};
