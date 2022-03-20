const reporteModel = require('../models/reporte.model');

// Jugadores o Técnico de X equipo
const reporte1 = (req, res) => {
  reporteModel.reporte1(req.query, (err, results) => {
    if (err)
      return response(res, 400, 'Error al obtener reporte 1 del cliente', err);

    return response(res, 200, 'Reporte 1 obtenido', results[0]);
  });
};

const response = (res, status, msj, data) => {
  res.status(status).send({ status, msj, data });
};

module.exports = { reporte1 };
