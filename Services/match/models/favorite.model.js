const mysqlConnection = require('../configs/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const obtenerUsuarios = (params, callback) => {
  const id = [params.id_team];

  const query = `
    SELECT Favorito.usuarioID, Equipo.nombre
    FROM Favorito
    INNER JOIN Equipo ON Favorito.equipoID = Equipo.equipoID
    WHERE Favorito.equipoID = ?
  `;

  execute(query, id, callback);
};

module.exports = { obtenerUsuarios };
