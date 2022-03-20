const mysqlConnection = require('../configs/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const agregarFavorito = (params, callback) => {
  const favorito = [params.id_client, params.id_team];

  const query = 'INSERT INTO Favorito (usuarioID, equipoID) VALUES (?, ?)';

  execute(query, favorito, callback);
};

module.exports = { agregarFavorito };
