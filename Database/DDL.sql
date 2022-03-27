DROP DATABASE IF EXISTS SoccerStats;
CREATE DATABASE SoccerStats;
USE SoccerStats;

-- DROP DATABASE IF EXISTS SoccerStatsDevelop;
-- CREATE DATABASE SoccerStatsDevelop;
-- USE SoccerStatsDevelop;

-- DROP DATABASE IF EXISTS SoccerStatsTesting;
-- CREATE DATABASE SoccerStatsTesting;
-- USE SoccerStatsTesting;

CREATE TABLE Pais(
    paisID INT NOT NULL,
    nombre VARCHAR(100) NULL,
    PRIMARY KEY (paisID)
);

CREATE TABLE PosicionJugador(
    posicionJugadorID INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (posicionJugadorID)
);

CREATE TABLE Jugador(
    jugadorID INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    estado INT NOT NULL,
    foto VARCHAR(255) NOT NULL,
    posicionJugadorID INT NOT NULL,
    paisID INT NOT NULL,
    PRIMARY KEY (jugadorID),
    FOREIGN KEY (posicionJugadorID) REFERENCES PosicionJugador(posicionJugadorID),
    FOREIGN KEY (paisID) REFERENCES Pais(paisID)
);

CREATE TABLE Equipo(
    equipoID INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    fechaFundacion DATE NOT NULL,
    fotoLogo VARCHAR(255) NOT NULL,
    paisID INT NOT NULL,
    PRIMARY KEY (equipoID),
    FOREIGN KEY (paisID) REFERENCES Pais(paisID)
);

CREATE TABLE Competencia(
    competenciaID INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    anio INT NOT NULL,
    tipo INT NOT NULL,
    paisID INT NULL,
    equipoCampeonID INT NULL,
    PRIMARY KEY (competenciaID),
    FOREIGN KEY (paisID) REFERENCES Pais(paisID),
    FOREIGN KEY (equipoCampeonID) REFERENCES Equipo(equipoID)
);

CREATE TABLE CompetenciaEquipo(
    competenciaEquipoID INT NOT NULL AUTO_INCREMENT,
    equipoID INT NOT NULL,
    competenciaID INT NOT NULL,
    PRIMARY KEY (competenciaEquipoID),
    FOREIGN KEY (equipoID) REFERENCES Equipo(equipoID),
    FOREIGN KEY (competenciaID) REFERENCES Competencia(competenciaID)
);

CREATE TABLE Usuario(
    usuarioID INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    claveAcceso VARCHAR(100) NOT NULL,
    fechaHoraClaveAcceso DATETIME NULL,
    claveTemporal VARCHAR(100) NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(100) NOT NULL,
    fotografia VARCHAR(255) NOT NULL,
    genero VARCHAR(1) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    fechaRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    direccion VARCHAR(255) NOT NULL,
    rol TINYINT NOT NULL,
    estado TINYINT NULL,
    paisID INT NOT NULL,
    PRIMARY KEY (usuarioID),
    FOREIGN KEY (paisID) REFERENCES Pais(paisID),
    UNIQUE (correo)
);

CREATE TABLE Bitacora(
    bitacoraID INT NOT NULL AUTO_INCREMENT,
    accion VARCHAR(100) NOT NULL,
    nombreTabla VARCHAR(100) NOT NULL,
    registro VARCHAR(255) NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    usuarioID INT NOT NULL,
    PRIMARY KEY (bitacoraID),
    FOREIGN KEY (usuarioID) REFERENCES Usuario(usuarioID)
);

CREATE TABLE Membresia(
    membresiaID INT NOT NULL AUTO_INCREMENT,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    pagada BOOLEAN NULL DEFAULT False,
    usuarioID INT NOT NULL,
    PRIMARY KEY (membresiaID),
    FOREIGN KEY (usuarioID) REFERENCES Usuario(usuarioID)
);

CREATE TABLE Favorito(
    favoritoID INT NOT NULL AUTO_INCREMENT,
    usuarioID INT NOT NULL,
    equipoID INT NOT NULL,
    PRIMARY KEY (favoritoID),
    FOREIGN KEY (usuarioID) REFERENCES Usuario(usuarioID),
    FOREIGN KEY (equipoID) REFERENCES Equipo(equipoID),
    UNIQUE (usuarioID, equipoID)
);

CREATE TABLE DirectorTecnico(
    directorTecnicoID INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    estado INTEGER NOT NULL, /*duda con el tipo*/
    foto VARCHAR(255) NOT NULL,
    paisID INT NOT NULL,
    PRIMARY KEY (directorTecnicoID),
    FOREIGN KEY (paisID) REFERENCES Pais(paisID)
);

CREATE TABLE Estadio(
    estadioID INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    fechaFundacion DATE NOT NULL,
    capacidad INT NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    estado INT NOT NULL,
    foto VARCHAR(255) NOT NULL,
    paisID INT NOT NULL,
    PRIMARY KEY (estadioID),
    FOREIGN KEY (paisID) REFERENCES Pais(paisID)
);

CREATE TABLE Arbitro(
    arbitroID INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    paisID INT NOT NULL,
    PRIMARY KEY (arbitroID),
    FOREIGN KEY (paisID) REFERENCES Pais(paisID)
);

CREATE TABLE Partido(
    partidoID INT NOT NULL AUTO_INCREMENT,
    asistencia INT NOT NULL,
    fechaHora DATETIME NOT NULL,
    equipoVisitaID INT NOT NULL,
    equipoLocalID INT NOT NULL,
    resultadoLocal INT NOT NULL,
    resultadoVisitante INT NOT NULL,
    estado INT NOT NULL,
    estadioID INT NOT NULL,
    arbitroID INT NULL,
    competenciaID INT NOT NULL,
    PRIMARY KEY (partidoID),
    FOREIGN KEY (equipoVisitaID) REFERENCES Equipo(equipoID),
    FOREIGN KEY (equipoLocalID) REFERENCES Equipo(equipoID),    
    FOREIGN KEY (estadioID) REFERENCES Estadio(estadioID),    
    FOREIGN KEY (arbitroID) REFERENCES Arbitro(arbitroID),    
    FOREIGN KEY (competenciaID) REFERENCES Competencia(competenciaID)
);

CREATE TABLE ContratoDT(
    contratoDTID INT NOT NULL AUTO_INCREMENT,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NULL,
    equipoOrigenID INT NULL,
    equipoDestinoID INT NULL,
    directorTecnicoID INT NOT NULL,
    PRIMARY KEY (contratoDTID),
    FOREIGN KEY (equipoOrigenID) REFERENCES Equipo(equipoID),
    FOREIGN KEY (equipoDestinoID) REFERENCES Equipo(equipoID),
    FOREIGN KEY (directorTecnicoID) REFERENCES DirectorTecnico(directorTecnicoID)
);

CREATE TABLE Noticia(
    noticiaID INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    equipoID INT NOT NULL,
    usuarioID INT NOT NULL,
    PRIMARY KEY (noticiaID),
    FOREIGN KEY (equipoID) REFERENCES Equipo(equipoID),
    FOREIGN KEY (usuarioID) REFERENCES Usuario(usuarioID)
);

CREATE TABLE ContratoJugador(
    contratoJugadorID INT NOT NULL AUTO_INCREMENT,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NULL,
    jugadorID INT NOT NULL,
    equipoOrigenID INT NULL,
    equipoDestinoID INT NULL,
    PRIMARY KEY (contratoJugadorID),
    FOREIGN KEY (jugadorID) REFERENCES Jugador(jugadorID),
    FOREIGN KEY (equipoOrigenID) REFERENCES Equipo(equipoID),
    FOREIGN KEY (equipoDestinoID) REFERENCES Equipo(equipoID)
);

CREATE TABLE Incidencia(
    incidenciaID INT NOT NULL AUTO_INCREMENT,
    minuto VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    tipo INT NOT NULL,
    jugadorID INT NOT NULL,
    partidoID INT NOT NULL,
    PRIMARY KEY (incidenciaID),
    FOREIGN KEY (jugadorID) REFERENCES Jugador(jugadorID),
    FOREIGN KEY (partidoID) REFERENCES Partido(partidoID)
);

-- Reportes
-- JUGADORES CON MAS INCIDENCIAS X INCIDENCIA Y COMPETICION
SELECT COUNT(*) AS count,
Jugador.jugadorID AS id, Jugador.nombre AS name, 
Jugador.foto AS photo, Jugador.apellido AS lastname,
Pais.nombre AS nacionality, PosicionJugador.nombre AS position,
Equipo.nombre AS team
FROM Incidencia
INNER JOIN Jugador ON Jugador.jugadorID = Incidencia.jugadorID
INNER JOIN Pais ON Pais.paisID = Jugador.paisID
INNER JOIN PosicionJugador ON PosicionJugador.posicionJugadorID = Jugador.posicionJugadorID
RIGHT JOIN ContratoJugador ON ContratoJugador.jugadorID = Jugador.jugadorID
INNER JOIN Equipo ON Equipo.equipoID = ContratoJugador.equipoOrigenID
WHERE Incidencia.jugadorID = 1 AND Incidencia.tipo = 1
ORDER BY count DESC;

-- JUGADORES CON MAS INCIDENCIAS X INCIDENCIA Y COMPETICION Z AÑO
SELECT COUNT(*) AS count,
Jugador.jugadorID AS id, Jugador.nombre AS name, 
Jugador.foto AS photo, Jugador.apellido AS lastname,
Pais.nombre AS nacionality, PosicionJugador.nombre AS position,
Equipo.nombre AS team, Competencia.anio AS year
FROM Incidencia
INNER JOIN Jugador ON Jugador.jugadorID = Incidencia.jugadorID
INNER JOIN Pais ON Pais.paisID = Jugador.paisID
INNER JOIN PosicionJugador ON PosicionJugador.posicionJugadorID = Jugador.posicionJugadorID
INNER JOIN ContratoJugador ON ContratoJugador.jugadorID = Jugador.jugadorID
RIGHT JOIN Equipo ON Equipo.equipoID = ContratoJugador.equipoOrigenID
INNER JOIN CompetenciaEquipo ON CompetenciaEquipo.equipoID = Equipo.equipoID
INNER JOIN Competencia ON Competencia.competenciaID = CompetenciaEquipo.competenciaID
WHERE Incidencia.jugadorID = 1 AND Incidencia.tipo = 1 AND Competencia.anio = 2022
ORDER BY count DESC;

-- COMPETENCIAS GANADAS POR Y EQUIPO
SELECT COUNT(*) AS count, Equipo.equipoID AS id_team, Equipo.nombre AS team, Equipo.fotoLogo AS photo,
Competencia.tipo AS type FROM Competencia
INNER JOIN Equipo ON Equipo.equipoID = Competencia.equipoCampeonID
WHERE Competencia.tipo IN (1, 2)
GROUP BY Equipo.equipoID;

-- LISTADO DE PARTIDOS EN X AÑOS
SELECT 
Partido.partidoID AS id, Partido.fechaHora AS game_date, Partido.asistencia AS attendees,
Partido.resultadoLocal AS result_local, Partido.resultadoVisitante AS result_visiting, 
Partido.estado AS status, Partido.estadioID AS id_stadium, Estadio.nombre AS stadium,
Partido.equipoLocalID AS id_team_local, E1.nombre AS team_local, E1.fotoLogo AS photo_local,
Partido.equipoVisitaID AS id_team_visiting, E2.nombre AS team_visiting, E2.fotoLogo AS photo_visiting,
Partido.competenciaID AS id_competition, Competencia.nombre AS competition
FROM Partido
INNER JOIN Equipo AS E1 ON E1.equipoID = Partido.equipoVisitaID
INNER JOIN Equipo AS E2 ON E2.equipoID = Partido.equipoLocalID
INNER JOIN Estadio ON Estadio.estadioID = Partido.estadioID
INNER JOIN Competencia ON Competencia.competenciaID = Partido.competenciaID
WHERE Competencia.anio = 2022;

-- PARTIDOS DE EQUIPO VS EQUIPO
SELECT 
Partido.partidoID AS id, Partido.fechaHora AS game_date, Partido.asistencia AS attendees,
Partido.resultadoLocal AS result_local, Partido.resultadoVisitante AS result_visiting, 
Partido.estado AS status, Partido.estadioID AS id_stadium, Estadio.nombre AS stadium,
Partido.equipoLocalID AS id_team_local, E1.nombre AS team_local, E1.fotoLogo AS photo_local,
Partido.equipoVisitaID AS id_team_visiting, E2.nombre AS team_visiting, E2.fotoLogo AS photo_visiting,
Partido.competenciaID AS id_competition, Competencia.nombre AS competition
FROM Partido
INNER JOIN Equipo AS E1 ON E1.equipoID = Partido.equipoVisitaID
INNER JOIN Equipo AS E2 ON E2.equipoID = Partido.equipoLocalID
INNER JOIN Estadio ON Estadio.estadioID = Partido.estadioID
INNER JOIN Competencia ON Competencia.competenciaID = Partido.competenciaID
WHERE (Partido.equipoVisitaID = 3 AND Partido.equipoLocalID = 1)
OR (Partido.equipoVisitaID = 1 AND Partido.equipoLocalID = 3);

-- LISTADO DE PARTIDOS DE X EQUIPOS
SELECT 
Partido.partidoID AS id, Partido.fechaHora AS game_date, Partido.asistencia AS attendees,
Partido.resultadoLocal AS result_local, Partido.resultadoVisitante AS result_visiting, 
Partido.estado AS status, Partido.estadioID AS id_stadium, Estadio.nombre AS stadium,
Partido.equipoLocalID AS id_team_local, E1.nombre AS team_local, E1.fotoLogo AS photo_local,
Partido.equipoVisitaID AS id_team_visiting, E2.nombre AS team_visiting, E2.fotoLogo AS photo_visiting,
Partido.competenciaID AS id_competition, Competencia.nombre AS competition
FROM Partido
INNER JOIN Equipo AS E1 ON E1.equipoID = Partido.equipoVisitaID
INNER JOIN Equipo AS E2 ON E2.equipoID = Partido.equipoLocalID
INNER JOIN Estadio ON Estadio.estadioID = Partido.estadioID
INNER JOIN Competencia ON Competencia.competenciaID = Partido.competenciaID
WHERE Partido.equipoVisitaID = 3 OR Partido.equipoLocalID = 3;

