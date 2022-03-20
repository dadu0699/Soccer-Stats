const countryModel = require("../models/country.model");


obtenerPaises = (req, res) => {
  countryModel.get(req, (err, results) => {
    if (err) return response(res, 400, 'Error al obtener los paises.', [err]);
    response(res, 200, 'Se han obtenido los paises.', results);
  });
};

const response = (res, code, msg, data) => {
  res.status(code).send({ status: code, msg, data });
};

module.exports = { obtenerPaises };
