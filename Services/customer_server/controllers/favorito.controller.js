const favoritoModel = require('../models/favorito.model');

const agregarFavorito = (req, res) => {
  favoritoModel.agregarFavorito(req.body, (err, results) => {
    if (err) return response(res, 400, 'Error al seguir a un equipo', err);

    return response(res, 200, 'Seguimiento de equipo agregado', results);
  });
};

const response = (res, status, msj, data) => {
  res.status(status).send({ status, msj, data });
};

module.exports = { agregarFavorito };
