const membresiaModel = require('../models/membresia.model');

const comprarMembresia = (req, res) => {
  membresiaModel.comprarMembresia(req.body, (err, _results) => {
    if (err) return response(res, 400, 'Error al obtener membresía ', []);

    return response(res, 200, 'Ahora cuenta con una membresía', []);
  });
};

const response = (res, status, msj, data) => {
  res.status(status).send({ status, msj, data });
};

module.exports = { comprarMembresia };
