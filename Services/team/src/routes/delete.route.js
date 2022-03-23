const {Router} = require("express");
const router = Router();
const pool = require('../db_connection');

const {verificarToken,isAdminOrEmployee,userID} = require("../utils/jwt");
const {saveBinnacle} = require("../utils/binnacle");

router.delete('/', [verificarToken,isAdminOrEmployee], (req, res) => {
    
    const { id } = req.body;

    let sql = 'DELETE FROM Equipo WHERE equipoID = ?';

    try {
        pool.query(sql, [id], async function(err, result){
            if(err){
                res.status(400).json({status:400, msg: "Error al eliminar equipo.", data: [err]});
            }else{
                await saveBinnacle("DELETE","Equipo",`Equipo con id: ${id}, eliminado con éxito.`, userID(req.headers.authorization.split(' ')[1]),(res)=>{console.log(res);});
                res.status(200).json({status:200, msg: "Equipo eliminado con éxito.", data: []});
            }
        });
    } catch (error) {
        res.status(500).json({status:500, msg: "Error al eliminar equipo.", data: [error]});
    }
});

module.exports = router;