const mysqlConnection = require('../config/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const get = (params, callback) => {
  const query = `
        SELECT paisID id, nombre name FROM Pais;
    `;

  return execute(query, null, callback);
};


module.exports = { get };
