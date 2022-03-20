const mysqlConnection = require('../config/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const get = (params, callback) => {
  const query = `
    SELECT noticiaID id, e.equipoID id_team, nombre team, usuarioID id_user,
    titulo tittle, descripcion description, fecha date
    FROM Noticia n, Equipo e
    WHERE n.equipoID = e.equipoID`;

  if (params.id)
    query += `AND noticiaID = ?`;

  return execute(query, params.id, callback);
};

const post = (params, callback) => {
  const query = `

    `;

  return execute(query, null, callback);
};


module.exports = { get, post };
