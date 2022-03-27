const mysqlConnection = require('../configs/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const crearPartido = (params, callback) => {
  const match = [
    params.attendees,
    params.game_date,
    params.id_team_visiting,
    params.id_team_local,
    params.result_local,
    params.result_visiting,
    params.status,
    params.id_stadium,
    params.id_competition,
  ];

  const query = `
    INSERT INTO Partido (asistencia, fechaHora, equipoVisitaID,
      equipoLocalID, resultadoLocal, resultadoVisitante, estado,
      estadioID, competenciaID)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  execute(query, match, callback);
};

const obtenerPartidos = (params, callback) => {
  const id = params.id;

  let query = `
    SELECT partidoID id, asistencia attendees, DATE_FORMAT(fechaHora, "%Y-%m-%d") game_date,
      Partido.equipoVisitaID id_team_visiting, EquipoVisita.nombre team_visiting,
      Partido.equipoLocalID id_team_local, EquipoLocal.nombre team_local,
      resultadoLocal result_local, resultadoVisitante result_visiting,
      Partido.estado status, Estadio.estadioID id_stadium,
      Estadio.nombre stadium, Competencia.competenciaID id_competition,
      Competencia.nombre competition, Competencia.paisID id_country, Pais.nombre country
    FROM Partido
    INNER JOIN Estadio ON (Estadio.estadioID = Partido.estadioID)
    INNER JOIN Equipo EquipoVisita ON (EquipoVisita.equipoID = Partido.equipoVisitaID)
    INNER JOIN Equipo EquipoLocal ON (EquipoLocal.equipoID = Partido.equipoLocalID)
    INNER JOIN Competencia ON (Competencia.competenciaID = Partido.competenciaID)
    INNER JOIN Pais ON (Pais.paisID = Competencia.paisID)
  `;

  if (id) query += ' WHERE partidoID = ?';

  execute(query, id, callback);
};

const actualizarPartido = (params, callback) => {
  const match = [
    params.attendees,
    params.game_date,
    params.id_team_visiting,
    params.id_team_local,
    params.result_local,
    params.result_visiting,
    params.status,
    params.id_stadium,
    params.id_competition,
    params.id,
  ];

  const query = `
    UPDATE Partido
    SET asistencia = ?, fechaHora = ?, equipoVisitaID = ?,
      equipoLocalID = ?, resultadoLocal = ?, resultadoVisitante = ?,
      estado = ?, estadioID = ?, competenciaID = ?
    WHERE partidoID = ?
  `;

  execute(query, match, callback);
};

const eliminarPartido = (params, callback) => {
  const query = `
    DELETE FROM Partido
    WHERE partidoID = ?
  `;

  execute(query, params.id, callback);
};

module.exports = {
  crearPartido,
  obtenerPartidos,
  actualizarPartido,
  eliminarPartido,
};
