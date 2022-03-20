const mysqlConnection = require('../config/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const get = (params, callback) => {
  const query = `

    `;

  return execute(query, null, callback);
};

const post = (params, callback) => {
  const query = `

    `;

  return execute(query, null, callback);
};


module.exports = { get, post };
