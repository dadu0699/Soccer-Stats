const employeeModel = require("../models/employee.model");


transferirJugador = (req, res) => {
  employeeModel.playerTransfer(req.body, (err, results) => {
    if (err) return response(res, 400, 'Error al transferir jugador.', [err]);
    response(res, 200, 'Jugador transferido con éxito.', results);
  });
};

const response = (res, code, msg, data) => {
  res.status(code).send({ status: code, msg, data });
};

module.exports = { transferirJugador };
