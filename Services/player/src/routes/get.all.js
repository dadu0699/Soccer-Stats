const {Router} = require("express");
const router = Router();
const pool = require('../db_connection');

router.get('/', (req, res) => {

    var sql = `
        SELECT jugadorID id, nombre name, apellido lastname, 
            DATE_FORMAT(fechaNacimiento, "%Y-%m-%d") birth_date,
            paisID id_nationality, pais nationality, posicionJugadorID position,
            estado status, equipoID id_team, equipo name_team, foto photo
        FROM vistaJugadores
    `;
    
    if (req.query.id != null) {
        sql += ` WHERE jugadorID = ${req.query.id}`;
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