const {Router} = require("express");
const router = Router();
const pool = require('../db_connection');

const {verificarToken,isAdminOrEmployee} = require("../utils/jwt");

router.get('/', [verificarToken,isAdminOrEmployee], (req, res) => {

    var sql = `SELECT Equipo.equipoID as "id", Equipo.nombre as "name", Equipo.fechaFundacion as "foundation_date ", Equipo.paisID as "id_country", Equipo.fotoLogo as "photo"
            FROM Equipo;`;

    try {
        pool.query(sql,function(err, result, fields){
            if (err) {
                res.status(500).json({status:500, msg: "Error al obtener equipo(s).", data: [err]});
            }else{
                res.status(200).json({status:200, msg: "Equipo(s) obtenido(s) con éxito.", data: result});
            }
        });
    } catch (error) {
        res.status(500).json({status:500, msg: "Error al obtener Equipo(s).", data: [error]});
    }
});

module.exports = router;