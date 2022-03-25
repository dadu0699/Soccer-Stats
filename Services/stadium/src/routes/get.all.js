const {Router} = require("express");
const router = Router();
const pool = require('../db_connection');

router.get('/', (req, res) => {

    var sql = `SELECT Estadio.EstadioID as "id", Estadio.nombre as "name", Estadio.fechaFundacion as "foundation_date", Estadio.capacidad as "capacity", 
    Estadio.paisID as "id_country", Pais.nombre as "country ", Estadio.direccion as "address", Estadio.estado as "status", Estadio.foto as "photo" 
    FROM Estadio JOIN Pais ON Pais.PaisID = Estadio.PaisID`

    if (req.query.id != null) {
        sql += ` WHERE Estadio.EstadioID = ${req.query.id};`;
    }

    try {
        pool.query(sql,function(err, result, fields){
            if (err) {
                res.status(400).json({status:400, msg: "Error al obtener estadio(s).", data: [err]});
            }else{
                res.status(200).json({status:200, msg: "Estadio(s) obtenido(s) con éxito.", data: result});
            }
        });
    } catch (error) {
        res.status(400).json({status:400, msg: "Error al obtener estadio(s).", data: [error]});
    }
});

module.exports = router;