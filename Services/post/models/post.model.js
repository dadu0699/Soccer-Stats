const mysqlConnection = require('../config/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const get = (params, callback) => {
  const id = params.id;
  let query = `
    SELECT noticiaID id, e.equipoID id_team, nombre team, usuarioID id_user,
    titulo title, descripcion description, DATE_FORMAT(fecha, "%Y-%m-%d") date
    FROM Noticia n, Equipo e
    WHERE n.equipoID = e.equipoID`;

  if (id) query += ' AND noticiaID = ?';

  return execute(query, id, callback);
};

const getByTeam = (params, callback) => {
  const id = params.id;
  let query = `
    SELECT noticiaID id, e.equipoID id_team, nombre team, usuarioID id_user,
    titulo title, descripcion description, DATE_FORMAT(fecha, "%Y-%m-%d") date
    FROM Noticia n, Equipo e
    WHERE n.equipoID = e.equipoID AND e.equipoID = ?`;

  return execute(query, id, callback);
};

const post = (params, callback) => {
  const noticia = [
    params.title,
    params.description,
    params.date,
    params.id_team,
    params.id_user,
  ];

  const query = `
    INSERT INTO Noticia( titulo, descripcion, fecha, equipoID, usuarioID)
    VALUES (?, ?, ?, ?, ?)
    `;

  return execute(query, noticia, callback);
};

module.exports = { get, getByTeam, post };
