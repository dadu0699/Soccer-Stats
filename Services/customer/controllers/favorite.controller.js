const favoriteModel = require('../models/favorite.model');

const verFavoritos = (req, res) => {
  if (req.query['id_client'] != req.user['id_user'])
    return res.status(401).send({ status: 401, msg: 'Unauthorized', data: [] });

  favoriteModel.verFavoritos(req.query, (err, results) => {
    if (err)
      return response(res, 400, 'Error al obtener los equipos favoritos.', err);

    return response(res, 200, 'Favoritos obtenidos con éxito.', results);
  });
};

const agregarFavorito = (req, res) => {
  if (req.body['id_client'] != req.user['id_user'])
    return res.status(401).send({ status: 401, msg: 'Unauthorized', data: [] });

  favoriteModel.agregarFavorito(req.body, (err, results) => {
    if (err)
      return response(res, 400, 'Error al agregar equipo a favoritos.', err);

    return response(
      res,
      200,
      'Equipo agregado a favoritos con éxito.',
      results
    );
  });
};

const response = (res, status, msg, data) => {
  res.status(status).send({ status, msg, data });
};

module.exports = { verFavoritos, agregarFavorito };
