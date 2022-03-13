DROP DATABASE IF EXISTS UStorage;
CREATE DATABASE UStorage;
USE UStorage;

CREATE TABLE Bitacora(
    bitacoraID INT NOT NULL AUTO_INCREMENT,
    registro VARCHAR(255) NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    usuarioID INT NOT NULL,
    PRIMARY KEY (bitacoraID),
    FOREIGN KEY (usuarioID) REFERENCES Usuario(usuarioID)
);

CREATE TABLE DirectorTecnico(
	directorTecnicoID INT NOT NULL AUTO_INCREMENT,
    nombre varchar(255) NOT NULL,
    apellido varchar(255) NOT NULL,
    fechaNacimiento DATETIME NOT NULL,
    estado varchar(255) NOT NULL, /*duda con el tipo*/
    foto varchar(255) NOT NULL,
    paisID INT NOT NULL,
    PRIMARY KEY (directorTecnicoID),
    FOREIGN KEY (paisID) REFERENCES Pais(paisID)
);

CREATE TABLE Estadio(
	estadioID INT NOT NULL AUTO_INCREMENT,
    nombre varchar(255) NOT NULL,
    capacidad INT NOT NULL,
    direccion varchar(255) NOT NULL,
    estado varchar(255) NOT NULL, /*duda con el tipo*/
    foto varchar(255) NOT NULL,
    paisID INT NOT NULL,
    PRIMARY KEY (estadioID),
    FOREIGN KEY (paisID) REFERENCES Pais(paisID)
);

CREATE TABLE Arbitro(
	arbitroID INT NOT NULL AUTO_INCREMENT,
    nombre varchar(255) NOT NULL,
    fechaNacimiento DATETIME NOT NULL,
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
    estado varchar(255) NOT NULL, /*duda con el tipo*/
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
    fechaInicio DATETIME NOT NULL,
    fechaFin DATETIME NOT NULL,
    equipoID INT NOT NULL,
    directorTecnicoID INT NOT NULL,
    PRIMARY KEY (contratoDTID),
    FOREIGN KEY (equipoID) REFERENCES Equipo(equipoID),
    FOREIGN KEY (directorTecnicoID) REFERENCES DirectorTecnico(directorTecnicoID)
);
