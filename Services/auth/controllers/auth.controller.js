const CryptoJS = require('crypto-js');
const generatorPassword = require('generate-password');

const { generateToken } = require('../configs/jwt');
const authModel = require('../models/auth.model');
const dispatchEmail = require('../configs/nodemail');

const key = CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
const iv = CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);

const iniciarSesion = (req, res) => {
  req.body['password'] = CryptoJS.AES.encrypt(req.body['password'], key, {
    iv,
  }).toString();

  authModel.signin(req.body, async (err, results) => {
    if (err) return response(res, 400, 'Error de autenticación.', [err]);

    if (!results[0] || results[0]['id_status'] != 1)
      return response(res, 400, 'Error de autenticación.', []);

    const payload = {
      id_user: results[0]['id_usuario'],
      id_rol: results[0]['id_rol'],
    };
    const token = await generateToken(payload);

    response(res, 200, '', { token, id_status: results[0]['id_status'] });
  });
};

const validarCuenta = (req, res) => {
  authModel.validate(req.query, (err, _results) => {
    if (err) return response(res, 400, 'Error al verificar correo.', [err]);

    response(res, 200, 'Correo verificado con éxito.', []);
  });
};

const temporalPassword = (req, res) => {
  const password = generatorPassword.generate({
    length: 8,
    numbers: true,
    symbols: true,
  });

  req.body['password'] = CryptoJS.AES.encrypt(password, key, {
    iv,
  }).toString();

  authModel.temporalPassword(req.body, (err, _results) => {
    if (err) {
      return response(res, 400, 'Error al enviar la contraseña temporal.', [
        err,
      ]);
    }

    dispatchEmail(req.body['email'], 'Reset password', 'temporal-password', {
      code: password,
      url: process.env.FRONTEND,
    });

    response(
      res,
      200,
      'Se ha enviado un correo para restablecer la contraseña.',
      []
    );
  });
};

const restablecerPassword = (req, res) => {
  req.body['new_password'] = CryptoJS.AES.encrypt(
    req.body['new_password'],
    key,
    { iv }
  ).toString();

  req.body['temporal_password'] = CryptoJS.AES.encrypt(
    req.body['temporal_password'],
    key,
    { iv }
  ).toString();

  authModel.restablecerPassword(req.body, (err, results) => {
    if (err)
      return response(res, 400, 'Error al restablecer la contraseña.', [err]);

    console.log(results);
    if (results['affectedRows'] <= 0)
      return response(res, 400, 'Error al restablecer la contraseña.', []);

    response(res, 200, 'Se ha restablecido la contraseña', []);
  });
};

const response = (res, code, msg, data) => {
  res.status(code).send({ status: code, msg, data });
};

module.exports = {
  iniciarSesion,
  validarCuenta,
  temporalPassword,
  restablecerPassword,
};
