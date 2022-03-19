DROP DATABASE IF EXISTS SoccerStats;
CREATE DATABASE SoccerStats;
USE SoccerStats;

-- DROP DATABASE IF EXISTS SoccerStatsDevelop;
-- CREATE DATABASE SoccerStatsDevelop;
-- USE SoccerStatsDevelop;

CREATE TABLE Pais(
    paisID INT NOT NULL,
    iso VARCHAR(2) NULL,
    nombre VARCHAR(100) NULL,
    nombre2 VARCHAR(100) NULL,
    iso3 VARCHAR(3) NULL,
    numcode INT NULL,
    phonecode INT NULL,
    PRIMARY KEY (paisID)
);

CREATE TABLE PosicionJugador(
    posicionJugadorID INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (posicionJugadorID)
);

CREATE TABLE Jugador(
    jugadorID INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    estado VARCHAR(100) NOT NULL,
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
    tipo VARCHAR(100) NOT NULL,
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
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(100) NOT NULL,
    fotografia VARCHAR(255) NOT NULL,
    genero BOOLEAN NOT NULL,
    fechaNacimiento DATE NOT NULL,
    fechaRegistro DATE NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    rol TINYINT NOT NULL,
    estado VARCHAR(100) NOT NULL,
    paisID INT NOT NULL,
    PRIMARY KEY (usuarioID),
    FOREIGN KEY (paisID) REFERENCES Pais(paisID)
);

CREATE TABLE Bitacora(
    bitacoraID INT NOT NULL AUTO_INCREMENT,
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
    estado VARCHAR(100) NOT NULL, /*duda con el tipo*/
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
    estado VARCHAR(100) NOT NULL, /*duda con el tipo*/
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
    estado VARCHAR(100) NOT NULL, /*duda con el tipo*/
    estadioID INT NOT NULL,
    arbitroID INT NOT NULL,
    competenciaID INT NOT NULL,
    PRIMARY KEY (partidoID),
    FOREIGN KEY (equipoVisitaID) REFERENCES Equipo(equipoID),
    FOREIGN KEY (equipoLocalID) REFERENCES Equipo(equipoID),    
    FOREIGN KEY (estadioID) REFERENCES Estadio(estadioID),    
    FOREIGN KEY (arbitroID) REFERENCES Arbitro(arbitroID),    
    FOREIGN KEY (competenciaID) REFERENCES Competencia(competenciaID)
);

CREATE TABLE ContradoDT(
    contratoDTID INT NOT NULL AUTO_INCREMENT,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    equipoID INT NOT NULL,
    directorTecnicoID INT NOT NULL,
    PRIMARY KEY (contratoDTID),
    FOREIGN KEY (equipoID) REFERENCES Equipo(equipoID),
    FOREIGN KEY (directorTecnicoID) REFERENCES DirectorTecnico(directorTecnicoID)
);

CREATE TABLE Noticia(
    noticiaID INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    equipoID INT NOT NULL,
    PRIMARY KEY (noticiaID),
    FOREIGN KEY (equipoID) REFERENCES Equipo(equipoID)
);

CREATE TABLE ContratoJugador(
    contratoJugadorID INT NOT NULL AUTO_INCREMENT,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    jugadorID INT NOT NULL,
    equipoID INT NOT NULL,
    PRIMARY KEY (contratoJugadorID),
    FOREIGN KEY (jugadorID) REFERENCES Jugador(jugadorID),
    FOREIGN KEY (equipoID) REFERENCES Equipo(equipoID)
);

CREATE TABLE Incidencia(
    incidenciaID INT NOT NULL AUTO_INCREMENT,
    minuto VARCHAR(100) NOT NULL,
    jugadorID INT NOT NULL,
    partidoID INT NOT NULL,
    PRIMARY KEY (incidenciaID),
    FOREIGN KEY (jugadorID) REFERENCES Jugador(jugadorID),
    FOREIGN KEY (partidoID) REFERENCES Partido(partidoID)
);

CREATE TABLE Gol(
    golID INT NOT NULL AUTO_INCREMENT,
    tipo VARCHAR(100) NOT NULL,
    distancia VARCHAR(100) NOT NULL,
    sufreID INT NOT NULL,
    cometeID INT NOT NULL,
    asistenteID INT NOT NULL,
    incidenciaID INT NOT NULL,
    PRIMARY KEY (golID),
    FOREIGN KEY (sufreID) REFERENCES Jugador(jugadorID),
    FOREIGN KEY (cometeID) REFERENCES Jugador(jugadorID),
    FOREIGN KEY (asistenteID) REFERENCES Jugador(jugadorID),
    FOREIGN KEY (incidenciaID) REFERENCES Incidencia(incidenciaID)
);

CREATE TABLE Tarjeta(
    tarjetaID INT NOT NULL AUTO_INCREMENT,
    color VARCHAR(100) NOT NULL,
    incidenciaID INT NOT NULL,
    PRIMARY KEY (tarjetaID),
    FOREIGN KEY (incidenciaID) REFERENCES Incidencia(incidenciaID)
);
