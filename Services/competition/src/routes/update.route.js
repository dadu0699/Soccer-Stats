const {Router} = require("express");
const pool = require('../db_connection');
const router = Router();

const {verificarToken,isAdminOrEmployee,userID} = require("../utils/jwt");
const {saveBinnacle} = require("../utils/binnacle");

router.put('/', [verificarToken,isAdminOrEmployee], async (req, res) => {
    
    const {id, name, type, year, id_champion_team, id_country} = req.body;

    try {

        let sql = "UPDATE Competencia SET nombre=?, anio=?, tipo=?, paisID=?, equipoCampeonID=? WHERE competenciaID = ?;";
    
        pool.query(sql, [name,year,type,id_country,id_champion_team,id], async function(err,result){
            if(err){
                res.status(400).json({status:400, msg: "Error al actualizar competencia.", data: [err]});
            }else{
                await saveBinnacle("UPDATE","Competencia ",`Competencia  con id: ${id}, actualizado con éxito.`, userID(req.headers.authorization.split(' ')[1]),(res)=>{console.log(res);});
                res.status(200).json({status:200, msg: "Competencia actualizado con éxito.", data: []});
            }
        });
    } catch (error) {
        res.status(400).json({status:400, msg: "Error al actualizar competencia.", data: [error]});
    }
});

module.exports = router;