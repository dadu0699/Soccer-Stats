const mysqlConnection = require('../configs/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const reporte1 = (params, callback) => {
  const equipoID = [params.equipo];
  const query = 'CALL sp_reporte1_cliente(?)';
  execute(query, equipoID, callback);
};

module.exports = { reporte1 };
