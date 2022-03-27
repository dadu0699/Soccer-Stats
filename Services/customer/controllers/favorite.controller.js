const favoriteModel = require('../models/favorite.model');

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

const response = (res, status, msj, data) => {
  res.status(status).send({ status, msj, data });
};

module.exports = { agregarFavorito };
