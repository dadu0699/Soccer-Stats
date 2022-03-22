const countryModel = require("../models/country.model");


const obtenerPaises = (req, res) => {
  countryModel.get(req.query, (err, results) => {
    if (err) return response(res, 400, 'Error al obtener (los) pais(es).', [err]);
    response(res, 200, 'Se han obtenido (los) pais(es).', results);
  });
};

const response = (res, code, msg, data) => {
  res.status(code).send({ status: code, msg, data });
};

module.exports = { obtenerPaises };
