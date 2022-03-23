const {Router} = require("express");
const router = Router();
const pool = require('../db_connection');

const {verificarToken,isAdminOrEmployee} = require("../utils/jwt");

router.get('/:id', [verificarToken,isAdminOrEmployee], (req, res) => {

    const id = req.params.id;

    var sql = `SELECT Estadio.EstadioID as "id", Estadio.nombre as "name", Estadio.fechaFundacion as "fundation_date", Estadio.capacidad as "capacity", 
                Estadio.paisID as "id_country", Pais.nombre as "country ", Estadio.direccion as "address", Estadio.estado as "state", Estadio.foto as "photo" 
                FROM Estadio JOIN Pais ON Pais.PaisID = Estadio.PaisID WHERE Estadio.estadioID = ${id};`

    try {
        pool.query(sql,function(err, result, fields){
            if (err) {
                res.status(400).json({status:400, msj: "Error al obtener estadio(s).", data: [err]});
            }else{
                res.status(200).json({status:200, msj: "Estadio(s) obtenido(s) con éxito.", data: result});
            }
        });
    } catch (error) {
        res.status(500).json({status:500, msj: "Error al obtener estadio(s).", data: [error]});
    }
});

module.exports = router;