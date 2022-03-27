const {Router} = require("express");
const router = Router();
const pool = require('../db_connection');


router.get('/', (req, res) => {

    var sql = `
    SELECT Equipo.equipoID as "id", Equipo.nombre as "name", 
        DATE_FORMAT(Equipo.fechaFundacion, "%Y-%m-%d") as "foundation_date", 
        Equipo.paisID as "id_country", Pais.nombre as "country", Equipo.fotoLogo as "photo"
    FROM Equipo
    INNER JOIN Pais ON Equipo.paisID = Pais.paisID`;
    
    if (req.query.id != null) {
        sql += ` WHERE Equipo.equipoID = ${req.query.id};`;
    }

    try {
        pool.query(sql,function(err, result, fields){
            if (err) {
                res.status(400).json({status:400, msg: "Error al obtener equipo(s).", data: [err]});
            }else{
                res.status(200).json({status:200, msg: "Equipo(s) obtenido(s) con éxito.", data: result});
            }
        });
    } catch (error) {
        res.status(400).json({status:400, msg: "Error al obtener Equipo(s).", data: [error]});
    }
});

module.exports = router;