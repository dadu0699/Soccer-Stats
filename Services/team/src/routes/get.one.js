const {Router} = require("express");
const router = Router();
const pool = require('../db_connection');

const {verificarToken,isAdminOrEmployee} = require("../utils/jwt");

router.get('/:id', [verificarToken,isAdminOrEmployee], (req, res) => {

    const id = req.params.id;

    var sql = `SELECT Equipo.equipoID as "id", Equipo.nombre as "name", Equipo.fechaFundacion as "foundation_date", Equipo.paisID as "id_country", Equipo.fotoLogo as "photo"
                FROM Equipo WHERE Equipo.equipoID = ${id};`;

    try {
        pool.query(sql,function(err, result, fields){
            if (err) {
                res.status(400).json({status:400, msj: "Error al obtener equipo(s).", data: [err]});
            }else{
                res.status(200).json({status:200, msj: "Equipo(s) obtenido(s) con éxito.", data: result});
            }
        });
    } catch (error) {
        res.status(500).json({status:500, msj: "Error al obtener equipo(s).", data: [error]});
    }
});

module.exports = router;