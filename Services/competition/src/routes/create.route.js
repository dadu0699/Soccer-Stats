const {Router} = require("express");
const pool = require('../db_connection');
const router = Router();

const {verificarToken,isAdminOrEmployee,userID} = require("../utils/jwt");
const {saveBinnacle} = require("../utils/binnacle");

router.post('/', [verificarToken,isAdminOrEmployee], async (req, res) => {

    const {name, type, year, id_country} = req.body;

    try {

        let sql = "INSERT INTO Competencia (nombre, anio, tipo, paisID, equipoCampeonID) VALUES(?,?,?,?,null);";

        pool.query(sql, [name,year,type,id_country], async function(err,result){
            if(err){
                res.status(400).json({status:400, msg: "Error al crear competencia.", data: [err]});
            }else{
                await saveBinnacle("CREATE","Competencia ","Competencia creada con éxito.", userID(req.headers.authorization.split(' ')[1]),(res)=>{console.log(res);});
                res.status(200).json({status:200, msg: "Competencia creada con éxito.", data: []});
            }
        });
    } catch (error) {
        res.status(400).json({status:400, msg: "Error al crear competencia.", data: [error]});
    }    
});

module.exports = router;