--------------------------------------------------------------------------------
CREATE OR REPLACE VIEW vistaJugadores AS
SELECT * FROM ((
	SELECT Jugador.*, Pais.nombre pais, PosicionJugador.nombre posicion,
		EquipoDestino.equipoID equipoID, EquipoDestino.nombre equipo
	FROM Jugador
	INNER JOIN Pais ON (Pais.paisID = Jugador.paisID)
	INNER JOIN PosicionJugador ON (PosicionJugador.posicionJugadorID = Jugador.posicionJugadorID)
	INNER JOIN ContratoJugador ON (ContratoJugador.jugadorID = Jugador.jugadorID)
	INNER JOIN Equipo EquipoOrigen ON (EquipoOrigen.equipoID = ContratoJugador.equipoOrigenID)
	INNER JOIN Equipo EquipoDestino ON (EquipoDestino.equipoID = ContratoJugador.equipoDestinoID)
	WHERE (ContratoJugador.fechaFin IS NULL AND NOW() >= ContratoJugador.fechaInicio)
		OR ((NOW() BETWEEN ContratoJugador.fechaInicio AND ContratoJugador.fechaFin))
) 
UNION
(
	SELECT Jugador.*, Pais.nombre pais, PosicionJugador.nombre posicion,
        EquipoOrigen.equipoID equipoID, EquipoOrigen.nombre equipo
	FROM Jugador
	INNER JOIN Pais ON (Pais.paisID = Jugador.paisID)
	INNER JOIN PosicionJugador ON (PosicionJugador.posicionJugadorID = Jugador.posicionJugadorID)
	INNER JOIN ContratoJugador ON (ContratoJugador.jugadorID = Jugador.jugadorID)
	INNER JOIN Equipo EquipoOrigen ON (EquipoOrigen.equipoID = ContratoJugador.equipoOrigenID)
	WHERE ContratoJugador.equipoDestinoID IS NULL AND
		(
			(ContratoJugador.fechaFin IS NULL AND NOW() >= ContratoJugador.fechaInicio)
			OR ((NOW() BETWEEN ContratoJugador.fechaInicio AND ContratoJugador.fechaFin))
		)
)
UNION
(
	SELECT Jugador.*, Pais.nombre pais, PosicionJugador.nombre posicion,
        EquipoDestino.equipoID equipoID, EquipoDestino.nombre equipo
	FROM Jugador
	INNER JOIN Pais ON (Pais.paisID = Jugador.paisID)
	INNER JOIN PosicionJugador ON (PosicionJugador.posicionJugadorID = Jugador.posicionJugadorID)
	INNER JOIN ContratoJugador ON (ContratoJugador.jugadorID = Jugador.jugadorID)
	INNER JOIN Equipo EquipoDestino ON (EquipoDestino.equipoID = ContratoJugador.equipoDestinoID)
	WHERE ContratoJugador.equipoOrigenID IS NULL AND
		(
			(ContratoJugador.fechaFin IS NULL AND NOW() >= ContratoJugador.fechaInicio)
			OR ((NOW() BETWEEN ContratoJugador.fechaInicio AND ContratoJugador.fechaFin))
		)
)
UNION
(
	SELECT Jugador.*, Pais.nombre pais, PosicionJugador.nombre posicion,
		'' equipoID, '' equipo
	FROM Jugador
	INNER JOIN Pais ON (Pais.paisID = Jugador.paisID)
	INNER JOIN PosicionJugador ON (PosicionJugador.posicionJugadorID = Jugador.posicionJugadorID)
))
AS jg
GROUP BY jg.jugadorID
ORDER BY jg.jugadorID;

--------------------------------------------------------------------------------
CREATE OR REPLACE VIEW vistaDirectores AS
SELECT * FROM ((
	SELECT DirectorTecnico.*, Pais.nombre pais,
		EquipoDestino.equipoID equipoID, EquipoDestino.nombre equipo
	FROM DirectorTecnico
	INNER JOIN Pais ON (Pais.paisID = DirectorTecnico.paisID)
	INNER JOIN ContratoDT ON (ContratoDT.directorTecnicoID = DirectorTecnico.directorTecnicoID)
	INNER JOIN Equipo EquipoOrigen ON (EquipoOrigen.equipoID = ContratoDT.equipoOrigenID)
	INNER JOIN Equipo EquipoDestino ON (EquipoDestino.equipoID = ContratoDT.equipoDestinoID)
	WHERE (ContratoDT.fechaFin IS NULL AND NOW() >= ContratoDT.fechaInicio)
		OR ((NOW() BETWEEN ContratoDT.fechaInicio AND ContratoDT.fechaFin))
) 
UNION
(
	SELECT DirectorTecnico.*, Pais.nombre pais,
        EquipoOrigen.equipoID equipoID, EquipoOrigen.nombre equipo
	FROM DirectorTecnico
	INNER JOIN Pais ON (Pais.paisID = DirectorTecnico.paisID)
	INNER JOIN ContratoDT ON (ContratoDT.directorTecnicoID = DirectorTecnico.directorTecnicoID)
	INNER JOIN Equipo EquipoOrigen ON (EquipoOrigen.equipoID = ContratoDT.equipoOrigenID)
	WHERE ContratoDT.equipoDestinoID IS NULL AND
		(
			(ContratoDT.fechaFin IS NULL AND NOW() >= ContratoDT.fechaInicio)
			OR ((NOW() BETWEEN ContratoDT.fechaInicio AND ContratoDT.fechaFin))
		)
)
UNION
(
	SELECT DirectorTecnico.*, Pais.nombre pais,
        EquipoDestino.equipoID equipoID, EquipoDestino.nombre equipo
	FROM DirectorTecnico
	INNER JOIN Pais ON (Pais.paisID = DirectorTecnico.paisID)
	INNER JOIN ContratoDT ON (ContratoDT.directorTecnicoID = DirectorTecnico.directorTecnicoID)
	INNER JOIN Equipo EquipoDestino ON (EquipoDestino.equipoID = ContratoDT.equipoDestinoID)
	WHERE ContratoDT.equipoOrigenID IS NULL AND
		(
			(ContratoDT.fechaFin IS NULL AND NOW() >= ContratoDT.fechaInicio)
			OR ((NOW() BETWEEN ContratoDT.fechaInicio AND ContratoDT.fechaFin))
		)
)
UNION
(
	SELECT DirectorTecnico.*, Pais.nombre pais,
		'' equipoID, '' equipo
	FROM DirectorTecnico
	INNER JOIN Pais ON (Pais.paisID = DirectorTecnico.paisID)
))
AS jg
GROUP BY jg.directorTecnicoID
ORDER BY jg.directorTecnicoID;