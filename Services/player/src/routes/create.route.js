const {Router} = require("express");
const pool = require('../db_connection');
const {v4} = require("uuid");
const router = Router();

const {saveFile} = require("../utils/aws.s3");
const {verificarToken,isAdminOrEmployee,userID} = require("../utils/jwt");
const {saveBinnacle} = require("../utils/binnacle");

router.post('/', [verificarToken,isAdminOrEmployee], async (req, res) => {

    const {name, lastname, birth_date, nationality, position, status, photo} = req.body;

    try {
        
        let ext = await extension(photo);
        let nombre = v4();
        let url = "https://grupof.s3.us-east-2.amazonaws.com/jugadores/"+nombre+"."+ext;
        
        let sql = "INSERT INTO Jugador (nombre, apellido, fechaNacimiento, estado, foto, posicionJugadorID, paisID) VALUES(?,?,?,?,?,?,?);";

        await saveFile(photo,nombre,ext,(res)=>{console.log(res)});

        pool.query(sql, [name,lastname,birth_date,status,url,position,nationality], async function(err,result){
            if(err){
                res.status(400).json({status:400, msg: "Error al crear jugador.", data: [err]});
            }else{
                await saveBinnacle("CREATE","Jugador","Jugador creado con éxito.", userID(req.headers.authorization.split(' ')[1]),(res)=>{console.log(res);});
                res.status(200).json({status:200, msg: "Jugador creado con éxito.", data: []});
            }
        });
    } catch (error) {
        res.status(400).json({status:400, msg: "Error al crear jugador.", data: [error]});
    }    
});

async function extension(photo){
    if(photo.includes('image/jpeg')){
        return 'jpeg'
    }else if(photo.includes('image/png')){
        return 'png'
    }else{
        return 'jpeg'
    }
}

module.exports = router;