const mysqlConnection = require('../configs/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const reporte1Jugadores = (params, callback) => {
  const equipoID = [params.id_team];

  const query = `
    SELECT Jugador.jugadorID AS id_person, Jugador.nombre AS name,
      apellido AS lastName, foto AS photo, equipoID AS id_team,
      Equipo.nombre AS name_team
    FROM Jugador
    INNER JOIN ContratoJugador ON (ContratoJugador.jugadorID = Jugador.jugadorID)
    INNER JOIN Equipo ON (Equipo.equipoID = ContratoJugador.equipoDestinoID)
    WHERE (NOW() BETWEEN ContratoJugador.fechaInicio AND ContratoJugador.fechaFin)
      AND ContratoJugador.equipoDestinoID = ?
  `;

  execute(query, equipoID, callback);
};

const reporte1Directores = (params, callback) => {
  const equipoID = [params.id_team];

  const query = `
    SELECT DirectorTecnico.directorTecnicoID AS id_person, DirectorTecnico.nombre AS name,
      apellido AS lastName, foto AS photo, equipoID AS id_team,
      Equipo.nombre AS name_team
    FROM DirectorTecnico
    INNER JOIN ContratoDT ON (ContratoDT.directorTecnicoID = DirectorTecnico.directorTecnicoID)
    INNER JOIN Equipo ON (Equipo.equipoID = ContratoDT.equipoDestinoID)
    WHERE (NOW() BETWEEN ContratoDT.fechaInicio AND ContratoDT.fechaFin)
      AND ContratoDT.equipoDestinoID = ?
  `;

  execute(query, equipoID, callback);
};

const reporte2Jugadores = (params, callback) => {
  const edad = [params.age];

  const query = `
    SELECT Equipo.nombre AS team, Jugador.jugadorID AS id, Jugador.nombre AS name,
      Jugador.foto AS photo, Jugador.apellido AS lastname,
      Pais.nombre AS nacionality, PosicionJugador.nombre AS position,
      FLOOR(DATEDIFF (NOW(), Jugador.fechaNacimiento)/365) AS age
    FROM ContratoJugador
    INNER JOIN Equipo ON Equipo.equipoID = ContratoJugador.equipoDestinoID
    INNER JOIN Jugador ON Jugador.jugadorID = ContratoJugador.jugadorID
    INNER JOIN Pais ON Pais.paisID = Jugador.paisID
    INNER JOIN PosicionJugador ON PosicionJugador.posicionJugadorID = Jugador.posicionJugadorID
    WHERE FLOOR(DATEDIFF (NOW(), Jugador.fechaNacimiento)/365) > ?
  `;

  execute(query, edad, callback);
};

const reporte2Directores = (params, callback) => {
  const edad = [params.age];

  const query = `
    SELECT Equipo.nombre AS team, DirectorTecnico.directorTecnicoID AS id,
      DirectorTecnico.nombre AS name, DirectorTecnico.foto AS photo,
      DirectorTecnico.apellido AS lastname, Pais.nombre AS nacionality,
      NULL AS position,
      FLOOR(DATEDIFF (NOW(), DirectorTecnico.fechaNacimiento)/365) AS age
    FROM ContratoDT
    INNER JOIN Equipo ON Equipo.equipoID = ContratoDT.equipoDestinoID
    INNER JOIN DirectorTecnico ON DirectorTecnico.directorTecnicoID = ContratoDT.directorTecnicoID
    INNER JOIN Pais ON Pais.paisID = DirectorTecnico.paisID
    WHERE FLOOR(DATEDIFF (NOW(), DirectorTecnico.fechaNacimiento)/365) > ?
  `;

  execute(query, edad, callback);
};

const reporte3Jugadores = (params, callback) => {
  const edad = [params.age];

  const query = `
    SELECT Equipo.nombre AS team, Jugador.jugadorID AS id, Jugador.nombre AS name,
      Jugador.foto AS photo, Jugador.apellido AS lastname,
      Pais.nombre AS nacionality, PosicionJugador.nombre AS position,
      FLOOR(DATEDIFF (NOW(), Jugador.fechaNacimiento)/365) AS age
    FROM ContratoJugador
    INNER JOIN Equipo ON Equipo.equipoID = ContratoJugador.equipoDestinoID
    INNER JOIN Jugador ON Jugador.jugadorID = ContratoJugador.jugadorID
    INNER JOIN Pais ON Pais.paisID = Jugador.paisID
    INNER JOIN PosicionJugador ON PosicionJugador.posicionJugadorID = Jugador.posicionJugadorID
    WHERE FLOOR(DATEDIFF (NOW(), Jugador.fechaNacimiento)/365) < ?
  `;

  execute(query, edad, callback);
};

const reporte3Directores = (params, callback) => {
  const edad = [params.age];

  const query = `
    SELECT Equipo.nombre AS team, DirectorTecnico.directorTecnicoID AS id,
      DirectorTecnico.nombre AS name, DirectorTecnico.foto AS photo,
      DirectorTecnico.apellido AS lastname, Pais.nombre AS nacionality, NULL AS position,
      FLOOR(DATEDIFF (NOW(), DirectorTecnico.fechaNacimiento)/365) AS age
    FROM ContratoDT
    INNER JOIN Equipo ON Equipo.equipoID = ContratoDT.equipoDestinoID
    INNER JOIN DirectorTecnico ON DirectorTecnico.directorTecnicoID = ContratoDT.directorTecnicoID
    INNER JOIN Pais ON Pais.paisID = DirectorTecnico.paisID
    WHERE FLOOR(DATEDIFF (NOW(), DirectorTecnico.fechaNacimiento)/365) < ?
  `;

  execute(query, edad, callback);
};

const reporte4 = (params, callback) => {
  const competicion = [params.id_competition];

  const query = `
    SELECT CompetenciaEquipo.competenciaID AS id_competition,
      Equipo.nombre team, Equipo.equipoID AS id_team,
      Equipo.fotoLogo AS photo
    FROM CompetenciaEquipo
    INNER JOIN Equipo ON Equipo.equipoID = CompetenciaEquipo.equipoID
    WHERE CompetenciaEquipo.competenciaID = ?
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
  const pais = [params.id_country];

  const query = `
    SELECT Equipo.equipoID AS id_team, Equipo.nombre AS team,
      Equipo.fotoLogo AS photo, Equipo.paisID AS id_country, Pais.nombre AS country,
      FLOOR(DATEDIFF (NOW(), Equipo.fechaFundacion)/365) AS foundation_date
    FROM Equipo
    INNER JOIN Pais ON Pais.paisID = Equipo.paisID
    WHERE FLOOR(DATEDIFF (NOW(), Equipo.fechaFundacion)/365) <= ?
  `;

  execute(query, pais, callback);
};

const reporte7 = (params, callback) => {
  const edad = [params.age];

  const query = `
    SELECT Estadio.estadioID AS id_stadium, Estadio.nombre AS stadium,
      Estadio.foto AS photo, Estadio.paisID AS id_country,
      Pais.nombre AS country
    FROM Estadio
    INNER JOIN Pais ON Pais.paisID = Estadio.paisID
    WHERE Estadio.paisID = ?
  `;

  execute(query, edad, callback);
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

  execute(query, equipo, callback);
};

const reporte10Director = (params, callback) => {
  const equipo = [params.id_team];

  const query = `
    SELECT DirectorTecnico.directorTecnicoID AS id, DirectorTecnico.nombre AS name,
      DirectorTecnico.foto AS photo, DirectorTecnico.apellido AS lastname,
      Pais.nombre AS nacionality, NULL AS position,
      ContratoDT.fechaInicio AS start_date, ContratoDT.fechaFin AS end_date
    FROM ContratoDT
    INNER JOIN Equipo ON Equipo.equipoID = ContratoDT.equipoDestinoID
    INNER JOIN DirectorTecnico ON DirectorTecnico.directorTecnicoID = ContratoDT.directorTecnicoID
    INNER JOIN Pais ON Pais.paisID = DirectorTecnico.paisID
    WHERE Equipo.equipoID = ?
  `;

  execute(query, equipo, callback);
};

const reporte10Jugador = (params, callback) => {
  const equipo = [params.id_team];

  const query = `
    SELECT Jugador.jugadorID AS id, Jugador.nombre AS name,
      Jugador.foto AS photo, Jugador.apellido AS lastname,
      Pais.nombre AS nacionality, PosicionJugador.nombre AS position,
      ContratoJugador.fechaInicio AS start_date, ContratoJugador.fechaFin AS end_date
    FROM ContratoJugador
    INNER JOIN Equipo ON Equipo.equipoID = ContratoJugador.equipoDestinoID
    INNER JOIN Jugador ON Jugador.jugadorID = ContratoJugador.jugadorID
    INNER JOIN Pais ON Pais.paisID = Jugador.paisID
    INNER JOIN PosicionJugador ON PosicionJugador.posicionJugadorID = Jugador.posicionJugadorID
    WHERE Equipo.equipoID = ?
  `;

  execute(query, equipo, callback);
};

const reporte11 = (params, callback) => {
  const goles = [params.goals];

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
    WHERE (Partido.resultadoLocal + Partido.resultadoVisitante) <= ?
  `;

  execute(query, goles, callback);
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
};
