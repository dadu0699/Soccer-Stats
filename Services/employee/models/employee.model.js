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

logPlayerTransfer = (params, callback) => {
  const id = params.id

  let query = `
      SELECT contratoJugadorID id, j.jugadorID id_player, j.nombre player_name, j.apellido player_lastname,
      eo.equipoID id_team_origin, eo.nombre team_origin, ed.equipoID id_team_destination, ed.nombre team_destination,
      DATE_FORMAT(fechaInicio, "%Y-%m-%d") start_date, DATE_FORMAT(fechaFin, "%Y-%m-%d") end_date
      FROM ContratoJugador cj
      INNER JOIN Jugador j ON j.jugadorID = cj.jugadorID
      INNER JOIN Equipo eo ON eo.equipoID = cj.equipoOrigenID
      INNER JOIN Equipo ed ON ed.equipoID = cj.equipoDestinoID
      `;

  if (id) query += ` WHERE cj.jugadorID = ?;`

  return execute(query, id, callback);
};

const technicalDirectorTransfer = (params, callback) => {
  const player = [params.start_date, params.end_date,
  params.id_team_origin, params.id_team_destination, params.id_coach];

  const query = `
      INSERT INTO ContratoDT (fechaInicio, fechaFin, equipoOrigenID, equipoDestinoID, directorTecnicoID)
      VALUES (?,?,?,?,?);
      `;

  return execute(query, player, callback);
};

logTechnicalDirectorTransfer = (params, callback) => {
  const id = params.id

  let query = `
      SELECT contratoDTID id, j.directorTecnicoID id_coach, j.nombre coach_name, j.apellido coach_lastname,
      eo.equipoID id_team_origin, eo.nombre team_origin, ed.equipoID id_team_destination, ed.nombre team_destination,
      DATE_FORMAT(fechaInicio, "%Y-%m-%d") start_date, DATE_FORMAT(fechaFin, "%Y-%m-%d") end_date
      FROM ContratoDT cdt
      INNER JOIN DirectorTecnico j ON j.directorTecnicoID = cdt.directorTecnicoID
      INNER JOIN Equipo eo ON eo.equipoID = cdt.equipoOrigenID
      INNER JOIN Equipo ed ON ed.equipoID = cdt.equipoDestinoID
      `;

  if (id) query += ` WHERE cdt.directorTecnicoID = ?;`

  return execute(query, id, callback);
};

module.exports = { playerTransfer, logPlayerTransfer, technicalDirectorTransfer, logTechnicalDirectorTransfer };
