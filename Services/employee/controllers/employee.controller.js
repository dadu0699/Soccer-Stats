const employeeModel = require("../models/employee.model");
const { writeLog } = require("../helpers/logHandler")


transferirJugador = (req, res) => {
  employeeModel.playerTransfer(req.body, (err, results) => {
    if (err) return response(res, 400, 'Error al transferir jugador.', [err]);

    writeLog({
      accion: 'CREATE',
      nombreTabla: 'ContratoJugador',
      registro: `Nueva transferencia de jugador, id de tranferencia ${results['insertId']}`,
      usuarioID: req.user['id_user']
    }, (error, result) => {
      if (err) return response(res, 400, 'Error al transferir jugador.', [error]);
      response(res, 200, 'Jugador transferido con éxito.', [results]);
    });
  });
};

logTransferenciaJugador = (req, res) => {
  employeeModel.logPlayerTransfer(req.query, (err, results) => {
    if (err) return response(res, 400, 'Error al obtener el log de transferencias.', [err]);
    response(res, 200, 'Log de transferencias obtenido con éxito.', [results]);
  });
}

transferirDirectorTecnico = (req, res) => {
  employeeModel.technicalDirectorTransfer(req.body, (err, results) => {
    if (err) return response(res, 400, 'Error al transferir director técnico.', [err]);

    writeLog({
      accion: 'CREATE',
      nombreTabla: 'ContratoDT',
      registro: `Nueva transferencia de director técnico, id de tranferencia ${results['insertId']}`,
      usuarioID: req.user['id_user']
    }, (error, result) => {
      if (err) return response(res, 400, 'Error al transferir director técnico.', [error]);
      response(res, 200, 'Director técnico transferido con éxito.', [results]);
    });
  });
};

logTransferenciaDirectorTecnico = (req, res) => {
  employeeModel.logTechnicalDirectorTransfer(req.query, (err, results) => {
    if (err) return response(res, 400, 'Error al obtener el log de transferencias.', [err]);
    response(res, 200, 'Log de transferencias obtenido con éxito.', [results]);
  });
}

agregarIncidencia = (req, res) => {
  employeeModel.createIncidence(req.body, (err, results) => {
    if (err) return response(res, 400, 'Error al agregar incidencia.', [err]);
    response(res, 200, 'Incidencia agregada con éxito.', [results]);
  });
}

const response = (res, code, msg, data) => {
  res.status(code).send({ status: code, msg, data });
};

module.exports = { transferirJugador, logTransferenciaJugador, transferirDirectorTecnico,
  logTransferenciaDirectorTecnico, agregarIncidencia };
