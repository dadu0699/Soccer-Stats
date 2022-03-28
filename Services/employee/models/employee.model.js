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

const logPlayerTransfer = (params, callback) => {
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

const logTechnicalDirectorTransfer = (params, callback) => {
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

const createIncidence = (params, callback) => {
  const player = [params.minute, params.description, params.type,
     params.id_player, params.id_game];

  const query = `
      INSERT INTO Incidencia (minuto, descripcion, tipo, jugadorID, partidoID)
      VALUES (?, ?, ?, ?, ?);
      `;

  return execute(query, player, callback);
};

const verIncidencias = (params, callback) => {
  const id = [params.id];

  let query = `
    SELECT Incidencia.incidenciaID id, Incidencia.minuto,
      Incidencia.descripcion, Incidencia.tipo,
      Jugador.nombre name, Jugador.apellido lastname,
        Partido.partidoID
    FROM Incidencia
    INNER JOIN Jugador ON Jugador.jugadorID = Incidencia.jugadorID
    INNER JOIN Partido ON Partido.partidoID = Incidencia.partidoID
  `;

  if (params.id) query += ` WHERE Incidencia.incidenciaID = ?;`;

  return execute(query, id, callback);
};

module.exports = {
  playerTransfer,
  logPlayerTransfer,
  technicalDirectorTransfer,
  logTechnicalDirectorTransfer,
  createIncidence,
  verIncidencias,
};