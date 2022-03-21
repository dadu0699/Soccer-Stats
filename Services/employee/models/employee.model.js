const mysqlConnection = require('../config/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const playerTransfer = (params, callback) => {
  const query = `
      `;

  return execute(query, null, callback);
};


module.exports = { playerTransfer };
