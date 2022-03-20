const countryModel = require("../models/country.model");


obtenerPaises = (req, res) => {
  countryModel.get(req, (err, results) => {
    if (err) return response(res, 400, err, 'Error al obtener los paises.');
    response(res, 200, results, 'Se han obtenido los paises.');
  });
};

const response = (res, code, data, msg) => {
  res.status(code).send({ status: code, msg, data });
};

module.exports = { obtenerPaises };
