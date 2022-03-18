const mysqlConnection = require('../configs/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const comprarMembresia = (params, callback) => {
  const query = `
    INSERT INTO Membresia (fechaInicio, fechaFin, pagada, usuarioID)
      VALUES (NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH), True, ?)
  `;

  execute(query, [params.id_client], callback);
};

module.exports = { comprarMembresia };
