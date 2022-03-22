const membershipModel = require('../models/membership.model');

const comprarMembresia = (req, res) => {
  membershipModel.comprarMembresia(req.body, (err, results) => {
    if (err) return response(res, 400, 'Error al comprar membresía.', err);

    return response(res, 200, 'Membresía comprada con éxito.', results);
  });
};

const response = (res, status, msg, data) => {
  res.status(status).send({ status, msg, data });
};

module.exports = { comprarMembresia };
