const mysqlConnection = require('../config/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const writeLog = (params, callback) => {
  const log = [params.accion, params.nombreTabla, params.registro,
  params.usuarioID]

  const query = `
    INSERT INTO Bitacora (accion, nombreTabla, registro, usuarioID)
    VALUES (?,?,?,?);
    `;

  return execute(query, log, callback);
};

module.exports = { writeLog };
