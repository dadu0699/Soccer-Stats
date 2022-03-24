const {Router} = require("express");
const router = Router();
const pool = require('../db_connection');

const {verificarToken,isAdminOrEmployee,userID} = require("../utils/jwt");
const {saveBinnacle} = require("../utils/binnacle");

router.delete('/', [verificarToken,isAdminOrEmployee], (req, res) => {
    
    const { id } = req.body;

    let sql = 'DELETE FROM Competencia WHERE competenciaID = ?';

    try {
        pool.query(sql, [id], async function(err, result){
            if(err){
                res.status(400).json({status:400, msg: "Error al eliminar competencia.", data: [err]});
            }else{
                await saveBinnacle("DELETE","Competencia",`Competencia con id: ${id}, eliminada con éxito.`, userID(req.headers.authorization.split(' ')[1]),(res)=>{console.log(res);});
                res.status(200).json({status:200, msg: "Competencia eliminada con éxito.", data: []});
            }
        });
    } catch (error) {
        res.status(400).json({status:400, msg: "Error al eliminar competencia.", data: [error]});
    }
});

module.exports = router;