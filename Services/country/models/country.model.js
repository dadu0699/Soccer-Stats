const mysqlConnection = require('../config/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const get = (params, callback) => {
  const id = params.id
  let query = `
        SELECT paisID id, nombre name FROM Pais
      `;

  if (id)
    query += ' WHERE paisID = ?'

  return execute(query, id, callback);
};


module.exports = { get };
