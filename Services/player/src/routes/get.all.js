const {Router} = require("express");
const router = Router();
const pool = require('../db_connection');

router.get('/', (req, res) => {

    var sql = `/*SIN CONTRATO (NO ESTAN EN TABLA ContratoJugador)*/
                SELECT j.jugadorID as "id", j.nombre as "name", j.apellido as "lastname", DATE_FORMAT(j.fechaNacimiento, "%Y-%m-%d") as "birth_date", 
                j.paisID as "nationality", j.posicionJugadorID as "position", j.estado as "status", null as "id_team", null as "name_team", j.foto as "photo"
                FROM Jugador j
                WHERE j.jugadorID NOT IN
                (
                    SELECT j.jugadorID 
                    FROM Jugador j
                    JOIN ContratoJugador cj ON cj.jugadorID = j.jugadorID
                    JOIN Equipo e ON e.equipoID = cj.equipoOrigenID AND isnull(cj.fechaFin)
                )`;
    
    if (req.query.id != null) {
        sql += ` AND j.jugadorID = ${req.query.id}`;
    }

    sql +=  ` UNION
            /*EQUIPOS CON CONTRATO AUN*/
            SELECT j.jugadorID as "id", j.nombre as "name", j.apellido as "lastname", DATE_FORMAT(j.fechaNacimiento, "%Y-%m-%d") as "birth_date", 
            j.paisID as "nationality", j.posicionJugadorID as "position", j.estado as "status", e.equipoId as "id_team", e.nombre as "name_team", j.foto as "photo" 
            FROM Jugador j
            JOIN ContratoJugador cj ON cj.jugadorID = j.jugadorID
            JOIN Equipo e ON e.equipoID = cj.equipoOrigenID AND isnull(cj.fechaFin)`;
    
    if (req.query.id != null) {
        sql += ` AND cj.jugadorID = ${req.query.id};`;
    }

    try {
        pool.query(sql,function(err, result, fields){
            if (err) {
                res.status(400).json({status:400, msg: "Error al obtener jugador(s).", data: [err]});
            }else{
                res.status(200).json({status:200, msg: "Jugador(s) obtenido(s) con éxito.", data: result});
            }
        });
    } catch (error) {
        res.status(400).json({status:400, msg: "Error al obtener jugador(s).", data: [error]});
    }
});

module.exports = router;