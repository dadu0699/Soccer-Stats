const {Router} = require("express");
const router = Router();
const pool = require('../db_connection');

router.get('/', (req, res) => {

    let sql =   `/*COMPTENCIAS QUE NO TIENEN EQUIPO CAMPEON*/
                SELECT Competencia.competenciaID as "id", Competencia.nombre as "name", Competencia.tipo as "type", 
                Competencia.anio as "year", Competencia.equipoCampeonID as "id_champion_team ", null as "champion_team", Competencia.paisID as "id_country ", Pais.nombre as "country" 
                FROM Competencia 
                JOIN Pais ON Pais.paisID = Competencia.paisID
                WHERE Competencia.competenciaID NOT IN
                (
                    SELECT Competencia.competenciaID as "id"
                    FROM Competencia 
                    JOIN Pais ON Pais.paisID = Competencia.paisID
                    JOIN Equipo ON Equipo.equipoID = Competencia.equipoCampeonID
                )`;

    if (req.query.id != null) {
        sql += ` AND Competencia.competenciaID = ${req.query.id}`;
    }

    sql += ` UNION
            /*COMPTENCIAS QUE TIENEN EQUIPO CAMPEON*/
            SELECT Competencia.competenciaID as "id", Competencia.nombre as "name", Competencia.tipo as "type", 
            Competencia.anio as "year", Competencia.equipoCampeonID as "id_champion_team ", Equipo.nombre as "champion_team", Competencia.paisID as "id_country ", Pais.nombre as "country" 
            FROM Competencia 
            JOIN Pais ON Pais.paisID = Competencia.paisID
            JOIN Equipo ON Equipo.equipoID = Competencia.equipoCampeonID`;

    if (req.query.id != null) {
        sql += ` AND Competencia.competenciaID = ${req.query.id};`;
    }

    try {
        pool.query(sql,function(err, result, fields){
            if (err) {
                res.status(400).json({status:400, msg: "Error al obtener competencia(s).", data: [err]});
            }else{
                res.status(200).json({status:200, msg: "Competencia(s) obtenido(s) con éxito.", data: result});
            }
        });
    } catch (error) {
        res.status(400).json({status:400, msg: "Error al obtener competencia(s).", data: [error]});
    }
});

module.exports = router;