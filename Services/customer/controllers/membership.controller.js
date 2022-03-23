const membershipModel = require('../models/membership.model');

const comprarMembresia = (req, res) => {
  if (req.body['id_client'] != req.user['id_user'])
    return res.status(401).send({ status: 401, msg: 'Unauthorized', data: [] });

  membershipModel.comprarMembresia(req.body, (err, results) => {
    if (err) return response(res, 400, 'Error al comprar membresía.', err);

    return response(res, 200, 'Membresía comprada con éxito.', results);
  });
};

const cancelarMembresia = (req, res) => {
  if (req.body['id_client'] != req.user['id_user'])
    return res.status(401).send({ status: 401, msg: 'Unauthorized', data: [] });

  membershipModel.cancelarMembresia(req.body, (err, results) => {
    if (err) return response(res, 400, 'Error al cancelar membresía.', err);

    return response(res, 200, 'Membresía cancelada con éxito.', results);
  });
};

const response = (res, status, msg, data) => {
  res.status(status).send({ status, msg, data });
};

module.exports = { comprarMembresia, cancelarMembresia };