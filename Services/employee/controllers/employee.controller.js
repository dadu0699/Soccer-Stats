const employeeModel = require("../models/employee.model");


transferirJugador = (req, res) => {
  employeeModel.playerTransfer(req.body, (err, results) => {
    if (err) return response(res, 400, 'Error al transferir jugador.', [err]);
    response(res, 200, 'Jugador transferido con éxito.', [results]);
  });
};

logTransferenciaJugador = (req, res) => {
  employeeModel.logPlayerTransfer(req.query, (err, results) => {
    if (err) return response(res, 400, 'Error al obtener el log de transferencias.', [err]);
    response(res, 200, 'Log de transferencias obtenido con éxito.', [results]);
  });
}

const response = (res, code, msg, data) => {
  res.status(code).send({ status: code, msg, data });
};

module.exports = { transferirJugador, logTransferenciaJugador };
