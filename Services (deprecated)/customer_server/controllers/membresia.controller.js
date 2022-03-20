const membresiaModel = require('../models/membresia.model');

const comprarMembresia = (req, res) => {
  membresiaModel.comprarMembresia(req.body, (err, results) => {
    if (err) return response(res, 400, 'Error al obtener membresía ', err);

    return response(res, 200, 'Ahora cuenta con una membresía', results);
  });
};

const response = (res, status, msj, data) => {
  res.status(status).send({ status, msj, data });
};

module.exports = { comprarMembresia };
