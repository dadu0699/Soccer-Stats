const mysqlConnection = require('../configs/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const verFavoritos = (params, callback) => {
  const id = [params.id_client];

  const query = `
    SELECT Equipo.equipoID AS id, Equipo.nombre AS name,
      Equipo.fotoLogo AS photo, Equipo.paisID AS id_country,
        Equipo.fechaFundacion AS foundation_date, Pais.nombre AS country
    FROM Equipo
    INNER JOIN Pais ON Pais.paisID = Equipo.paisID
    INNER JOIN Favorito ON Favorito.equipoID = Equipo.equipoID
    WHERE Favorito.usuarioID = ?
  `;

  execute(query, id, callback);
};

const agregarFavorito = (params, callback) => {
  const favorito = [params.id_client, params.id_team];

  const query = 'INSERT INTO Favorito (usuarioID, equipoID) VALUES (?, ?)';

  execute(query, favorito, callback);
};

module.exports = { verFavoritos, agregarFavorito };
