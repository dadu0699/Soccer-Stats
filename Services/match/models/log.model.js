const mysqlConnection = require('../configs/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const agregarLog = (params, callback) => {
  const log = [
    params.accion,
    params.nombreTabla,
    params.registro,
    params.usuarioID,
  ];

  const query = `
    INSERT INTO Bitacora (accion, nombreTabla, registro, fecha, usuarioID)
    VALUES (?, ?, ?, NOW(), ?)
  `;

  execute(query, log, callback);
};

module.exports = { agregarLog };
