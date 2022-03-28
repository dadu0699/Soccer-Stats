const mysqlConnection = require('../configs/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const reporte1Jugadores = (params, callback) => {
  const equipoID = [params.id_team];

  const query = `
    SELECT jugadorID AS id, nombre AS name, apellido AS lastname,
      pais AS nationality, foto AS photo, posicion AS position
    FROM vistaJugadores
    WHERE equipoID = ?
  `;

  execute(query, equipoID, callback);
};

const reporte1Directores = (params, callback) => {
  const equipoID = [params.id_team];

  const query = `
    SELECT directorTecnicoID AS id, nombre AS name, apellido AS lastname,
      pais AS nationality, foto AS photo, '' AS position
    FROM vistaDirectores
    WHERE equipoID = ?
  `;

  execute(query, equipoID, callback);
};

const reporte2Jugadores = (params, callback) => {
  const edad = [params.age];

  const query = `
    SELECT jugadorID AS id, nombre AS name, apellido AS lastname,
      pais AS nationality, foto AS photo, posicion AS position,
      equipo AS team,
      FLOOR(DATEDIFF (NOW(), fechaNacimiento)/365) AS age
    FROM vistaJugadores
    WHERE FLOOR(DATEDIFF (NOW(), fechaNacimiento)/365) > ?
  `;

  execute(query, edad, callback);
};

const reporte2Directores = (params, callback) => {
  const edad = [params.age];

  const query = `
    SELECT directorTecnicoID AS id, nombre AS name, apellido AS lastname,
      pais AS nationality, foto AS photo, '' AS position,
      equipo AS team,
      FLOOR(DATEDIFF (NOW(), fechaNacimiento)/365) AS age
    FROM vistaDirectores
    WHERE FLOOR(DATEDIFF (NOW(), fechaNacimiento)/365) > ?
  `;

  execute(query, edad, callback);
};

const reporte3Jugadores = (params, callback) => {
  const edad = [params.age];

  const query = `
    SELECT jugadorID AS id, nombre AS name, apellido AS lastname,
      pais AS nationality, foto AS photo, posicion AS position,
      equipo AS team,
      FLOOR(DATEDIFF (NOW(), fechaNacimiento)/365) AS age
    FROM vistaJugadores
    WHERE FLOOR(DATEDIFF (NOW(), fechaNacimiento)/365) < ?
  `;

  execute(query, edad, callback);
};

const reporte3Directores = (params, callback) => {
  const edad = [params.age];

  const query = `
    SELECT directorTecnicoID AS id, nombre AS name, apellido AS lastname,
      pais AS nationality, foto AS photo, '' AS position,
      equipo AS team,
      FLOOR(DATEDIFF (NOW(), fechaNacimiento)/365) AS age
    FROM vistaDirectores
    WHERE FLOOR(DATEDIFF (NOW(), fechaNacimiento)/365) < ?
  `;

  execute(query, edad, callback);
};

const reporte4 = (params, callback) => {
  const competicion = [params.id_competition];

  const query = `
    SELECT * FROM ((
      SELECT Equipo.equipoID id_team, Equipo.nombre team, Equipo.fotoLogo photo,
        Competencia.competenciaID id_competition, Competencia.nombre competition
      FROM Partido
      INNER JOIN Equipo ON Equipo.equipoID = Partido.equipoLocalID
        INNER JOIN Competencia ON Competencia.competenciaID = Partido.competenciaID
    )
    UNION
    (
      SELECT Equipo.equipoID id_team, Equipo.nombre team, Equipo.fotoLogo photo,
        Competencia.competenciaID id_competition, Competencia.nombre competition
      FROM Partido
      INNER JOIN Equipo ON Equipo.equipoID = Partido.equipoVisitaID
        INNER JOIN Competencia ON Competencia.competenciaID = Partido.competenciaID
    )) AS eqc
    WHERE id_competition = ?
  `;

  execute(query, competicion, callback);
};

const reporte5 = (params, callback) => {
  const pais = [params.id_country];

  const query = `
    SELECT Equipo.equipoID AS id_team, Equipo.nombre AS team,
      Equipo.fotoLogo AS photo, Equipo.paisID AS id_country,
      Pais.nombre AS country
    FROM Equipo
    INNER JOIN Pais ON Pais.paisID = Equipo.paisID
    WHERE Pais.paisID = ?
  `;

  execute(query, pais, callback);
};

const reporte6 = (params, callback) => {
  const edad = [params.age];

  const query = `
    SELECT Equipo.equipoID AS id_team, Equipo.nombre AS team,
      Equipo.fotoLogo AS photo, Equipo.paisID AS id_country,
      Pais.nombre AS country,
      DATE_FORMAT(Equipo.fechaFundacion, "%Y-%m-%d") AS foundation_date
    FROM Equipo
    INNER JOIN Pais ON Pais.paisID = Equipo.paisID
    WHERE FLOOR(DATEDIFF (NOW(), Equipo.fechaFundacion)/365) = ?
  `;

  execute(query, edad, callback);
};

const reporte7 = (params, callback) => {
  const pais = [params.id_country];

  const query = `
    SELECT Estadio.estadioID AS id_stadium, Estadio.nombre AS stadium,
      Estadio.foto AS photo, Estadio.paisID AS id_country,
      Pais.nombre AS country
    FROM Estadio
    INNER JOIN Pais ON Pais.paisID = Estadio.paisID
    WHERE Estadio.paisID = ?
  `;

  execute(query, pais, callback);
};

const reporte8 = (params, callback) => {
  const capacidad = [params.capacity];

  const query = `
    SELECT Estadio.estadioID AS id_stadium,
      Estadio.nombre AS stadium, Estadio.capacidad AS capacity,
      Estadio.foto AS photo, Estadio.paisID AS id_country,
      Pais.nombre AS country
    FROM Estadio
    INNER JOIN Pais ON Pais.paisID = Estadio.paisID
    WHERE Estadio.capacidad <= ?
  `;

  execute(query, capacidad, callback);
};

const reporte9 = (params, callback) => {
  const equipo = [params.id_team, params.id_team];

  const query = `
    SELECT Partido.partidoID AS id, DATE_FORMAT(Partido.fechaHora, "%Y-%m-%d") AS game_date,
      Partido.asistencia AS attendees, Partido.resultadoLocal AS result_local,
      Partido.resultadoVisitante AS result_visiting, Partido.estado AS status,
      Partido.estadioID AS id_stadium, Estadio.nombre AS stadium, Partido.equipoLocalID AS id_team_local,
      E1.nombre AS team_local, E1.fotoLogo AS photo_local, Partido.equipoVisitaID AS id_team_visiting,
      E2.nombre AS team_visiting, E2.fotoLogo AS photo_visiting, Partido.competenciaID AS id_competition,
      Competencia.nombre AS competition
    FROM Partido
    INNER JOIN Equipo AS E1 ON E1.equipoID = Partido.equipoVisitaID
    INNER JOIN Equipo AS E2 ON E2.equipoID = Partido.equipoLocalID
    INNER JOIN Estadio ON Estadio.estadioID = Partido.estadioID
    INNER JOIN Competencia ON Competencia.competenciaID = Partido.competenciaID
    WHERE Partido.equipoVisitaID = ? OR Partido.equipoLocalID = ?
  `;

  execute(query, equipo, callback);
};

const reporte10Director = (params, callback) => {
  const director = [params.id];

  const query = `
    SELECT team, id_team, photo, country FROM ((
      SELECT DirectorTecnico.*, EquipoDestino.nombre team, EquipoDestino.equipoID id_team,
        EquipoDestino.fotoLogo photo, Pais.nombre country
      FROM DirectorTecnico
      INNER JOIN ContratoDT ON (ContratoDT.directorTecnicoID = DirectorTecnico.directorTecnicoID)
      INNER JOIN Equipo EquipoDestino ON (EquipoDestino.equipoID = ContratoDT.equipoDestinoID)
      INNER JOIN Pais ON (Pais.paisID = EquipoDestino.paisID)
    )
    UNION
    (
      SELECT DirectorTecnico.*, EquipoOrigen.nombre team, EquipoOrigen.equipoID id_team,
        EquipoOrigen.fotoLogo photo, Pais.nombre country
      FROM DirectorTecnico
      INNER JOIN ContratoDT ON (ContratoDT.directorTecnicoID = DirectorTecnico.directorTecnicoID)
      INNER JOIN Equipo EquipoOrigen ON (EquipoOrigen.equipoID = ContratoDT.equipoOrigenID)
      INNER JOIN Pais ON (Pais.paisID = EquipoOrigen.paisID)
    )) AS eqp
    WHERE eqp.directorTecnicoID = ?
  `;

  execute(query, director, callback);
};

const reporte10Jugador = (params, callback) => {
  const jugador = [params.id];

  const query = `
    SELECT team, id_team, photo, country FROM ((
      SELECT Jugador.*, EquipoDestino.nombre team, EquipoDestino.equipoID id_team,
        EquipoDestino.fotoLogo photo, Pais.nombre country
      FROM Jugador
      INNER JOIN ContratoJugador ON (ContratoJugador.jugadorID = Jugador.jugadorID)
      INNER JOIN Equipo EquipoDestino ON (EquipoDestino.equipoID = ContratoJugador.equipoDestinoID)
      INNER JOIN Pais ON (Pais.paisID = EquipoDestino.paisID)
    )
    UNION
    (
      SELECT Jugador.*, EquipoOrigen.nombre team, EquipoOrigen.equipoID id_team,
        EquipoOrigen.fotoLogo photo, Pais.nombre country
      FROM Jugador
      INNER JOIN ContratoJugador ON (ContratoJugador.jugadorID = Jugador.jugadorID)
      INNER JOIN Equipo EquipoOrigen ON (EquipoOrigen.equipoID = ContratoJugador.equipoOrigenID)
      INNER JOIN Pais ON (Pais.paisID = EquipoOrigen.paisID)
    )) AS eqp
    WHERE eqp.jugadorID = ?
  `;

  execute(query, jugador, callback);
};

const reporte11 = (params, callback) => {
  const goles = [params.goals];

  const query = `
    SELECT Partido.partidoID AS id, DATE_FORMAT(Partido.fechaHora, "%Y-%m-%d") AS game_date,
      Partido.asistencia AS attendees, Partido.resultadoLocal AS result_local,
      Partido.resultadoVisitante AS result_visiting, Partido.estado AS status,
      Partido.estadioID AS id_stadium, Estadio.nombre AS stadium, Partido.equipoLocalID AS id_team_local,
      E1.nombre AS team_local, E1.fotoLogo AS photo_local, Partido.equipoVisitaID AS id_team_visiting,
      E2.nombre AS team_visiting, E2.fotoLogo AS photo_visiting, Partido.competenciaID AS id_competition,
      Competencia.nombre AS competition
    FROM Partido
    INNER JOIN Equipo AS E1 ON E1.equipoID = Partido.equipoVisitaID
    INNER JOIN Equipo AS E2 ON E2.equipoID = Partido.equipoLocalID
    INNER JOIN Estadio ON Estadio.estadioID = Partido.estadioID
    INNER JOIN Competencia ON Competencia.competenciaID = Partido.competenciaID
    WHERE (Partido.resultadoLocal + Partido.resultadoVisitante) >= ?
  `;

  execute(query, goles, callback);
};

const reporte12 = (params, callback) => {
  const parametros = [params.incidence, params.id_competition];

  const query = `
    SELECT COUNT(*) count, vistaJugadores.jugadorID AS id, nombre AS name, apellido AS lastname,
      pais AS nationality, foto AS photo, posicion AS position
    FROM vistaJugadores
    INNER JOIN Incidencia ON Incidencia.jugadorID = vistaJugadores.jugadorID
    INNER JOIN Partido ON Partido.partidoID = Incidencia.partidoID
    WHERE Incidencia.tipo = ? AND Partido.competenciaID = ?
    ORDER BY count
    DESC LIMIT 5
  `;

  execute(query, parametros, callback);
};

const reporte13 = (params, callback) => {
  const parametros = [params.incidence, params.year];

  let query = `
      SELECT COUNT(*) count, vistaJugadores.jugadorID AS id, vistaJugadores.nombre AS name,
      apellido AS lastname, pais AS nationality, foto AS photo, posicion AS position,
      Competencia.competenciaID AS id_competition, Competencia.nombre AS competition
    FROM vistaJugadores
    INNER JOIN Incidencia ON Incidencia.jugadorID = vistaJugadores.jugadorID
    INNER JOIN Partido ON Partido.partidoID = Incidencia.partidoID
    INNER JOIN Competencia ON Competencia.competenciaID = Partido.competenciaID
    WHERE Incidencia.tipo = ? AND Competencia.anio = ? AND (
  `;

  query += ' Competencia.competenciaID = ? ';
  parametros.push(params.competitions[0]);
  for (let i = 1; i < params.competitions.length; i++) {
    query += ' OR Competencia.tipo = ?';
    parametros.push(params.competitions[i]);
  }
  query += `)
    GROUP BY competition
    ORDER BY count
    DESC LIMIT 5
  `;

  execute(query, parametros, callback);
};

const reporte14 = (params, callback) => {
  const parametros = [params.id_team];

  let query = `
    SELECT COUNT(*) AS count, Equipo.equipoID AS id_team,
      Equipo.nombre AS team, Equipo.fotoLogo AS photo,
      Competencia.tipo AS type, Competencia.competenciaID AS id_competition,
      Competencia.nombre AS competition
    FROM Competencia
    INNER JOIN Equipo ON Equipo.equipoID = Competencia.equipoCampeonID
    WHERE Competencia.equipoCampeonID = ? AND Competencia.tipo IN (?
  `;

  parametros.push(params.competitions[0]);
  for (let i = 1; i < params.competitions.length; i++) {
    query += ',?';
    parametros.push(params.competitions[i]);
  }
  query += ') GROUP BY Equipo.equipoID';

  execute(query, parametros, callback);
};

const reporte15 = (params, callback) => {
  const parametros = [params.year];

  const query = `
    SELECT Partido.partidoID AS id, DATE_FORMAT(Partido.fechaHora, "%Y-%m-%d") AS game_date,
      Partido.asistencia AS attendees, Partido.resultadoLocal AS result_local,
      Partido.resultadoVisitante AS result_visiting, Partido.estado AS status,
      Partido.estadioID AS id_stadium, Estadio.nombre AS stadium, Partido.equipoLocalID AS id_team_local,
      E1.nombre AS team_local, E1.fotoLogo AS photo_local, Partido.equipoVisitaID AS id_team_visiting,
      E2.nombre AS team_visiting, E2.fotoLogo AS photo_visiting, Partido.competenciaID AS id_competition,
      Competencia.nombre AS competition
    FROM Partido
    INNER JOIN Equipo AS E1 ON E1.equipoID = Partido.equipoVisitaID
    INNER JOIN Equipo AS E2 ON E2.equipoID = Partido.equipoLocalID
    INNER JOIN Estadio ON Estadio.estadioID = Partido.estadioID
    INNER JOIN Competencia ON Competencia.competenciaID = Partido.competenciaID
    WHERE Competencia.anio = ?
  `;

  execute(query, parametros, callback);
};

const reporte16 = (params, callback) => {
  const parametros = [
    params.id_team,
    params.id_opposing_team,
    params.id_opposing_team,
    params.id_team,
  ];

  const query = `
    SELECT Partido.partidoID AS id, DATE_FORMAT(Partido.fechaHora, "%Y-%m-%d") AS game_date,
      Partido.asistencia AS attendees, Partido.resultadoLocal AS result_local,
      Partido.resultadoVisitante AS result_visiting, Partido.estado AS status,
      Partido.estadioID AS id_stadium, Estadio.nombre AS stadium, Partido.equipoLocalID AS id_team_local,
      E1.nombre AS team_local, E1.fotoLogo AS photo_local, Partido.equipoVisitaID AS id_team_visiting,
      E2.nombre AS team_visiting, E2.fotoLogo AS photo_visiting, Partido.competenciaID AS id_competition,
      Competencia.nombre AS competition
    FROM Partido
    INNER JOIN Equipo AS E1 ON E1.equipoID = Partido.equipoVisitaID
    INNER JOIN Equipo AS E2 ON E2.equipoID = Partido.equipoLocalID
    INNER JOIN Estadio ON Estadio.estadioID = Partido.estadioID
    INNER JOIN Competencia ON Competencia.competenciaID = Partido.competenciaID
    WHERE (Partido.equipoVisitaID = ? AND Partido.equipoLocalID = ?)
      OR (Partido.equipoVisitaID = ? AND Partido.equipoLocalID = ?)
  `;

  execute(query, parametros, callback);
};

const reporte17 = (params, callback) => {
  const parametros = [params.id_team, params.id_team];

  const query = `
    SELECT Partido.partidoID AS id, Partido.fechaHora AS game_date,
      Partido.asistencia AS attendees, Partido.resultadoLocal AS result_local,
      Partido.resultadoVisitante AS result_visiting, Partido.estado AS status,
      Partido.estadioID AS id_stadium, Estadio.nombre AS stadium, Partido.equipoLocalID AS id_team_local,
      E1.nombre AS team_local, E1.fotoLogo AS photo_local, Partido.equipoVisitaID AS id_team_visiting,
      E2.nombre AS team_visiting, E2.fotoLogo AS photo_visiting, Partido.competenciaID AS id_competition,
      Competencia.nombre AS competition
    FROM Partido
    INNER JOIN Equipo AS E1 ON E1.equipoID = Partido.equipoVisitaID
    INNER JOIN Equipo AS E2 ON E2.equipoID = Partido.equipoLocalID
    INNER JOIN Estadio ON Estadio.estadioID = Partido.estadioID
    INNER JOIN Competencia ON Competencia.competenciaID = Partido.competenciaID
    WHERE Partido.equipoVisitaID = ? OR Partido.equipoLocalID = ?
  `;

  execute(query, parametros, callback);
};

module.exports = {
  reporte1Jugadores,
  reporte1Directores,
  reporte2Jugadores,
  reporte2Directores,
  reporte3Jugadores,
  reporte3Directores,
  reporte4,
  reporte5,
  reporte6,
  reporte7,
  reporte8,
  reporte9,
  reporte10Director,
  reporte10Jugador,
  reporte11,
  reporte12,
  reporte13,
  reporte14,
  reporte15,
  reporte16,
  reporte17,
};
