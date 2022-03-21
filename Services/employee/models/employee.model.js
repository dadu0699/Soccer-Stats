const mysqlConnection = require('../config/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const playerTransfer = (params, callback) => {
  const player = [params.start_date, params.end_date, params.id_player,
  params.id_team_origin, params.id_team_destination];

  const query = `
      INSERT INTO ContratoJugador (fechaInicio, fechaFin, jugadorID, equipoOrigenID, equipoDestinoID)
      VALUES (?,?,?,?,?);
      `;

  return execute(query, player, callback);
};


module.exports = { playerTransfer };
