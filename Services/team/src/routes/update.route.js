const {Router} = require("express");
const pool = require('../db_connection');
const {v4} = require("uuid");
const router = Router();

const {saveFile} = require("../utils/aws.s3");
const {verificarToken,isAdminOrEmployee,userID} = require("../utils/jwt");
const {saveBinnacle} = require("../utils/binnacle");

router.put('/', [verificarToken,isAdminOrEmployee], async (req, res) => {
    
    const { id, name, foundation_date, id_country } = req.body;
    let { photo } = req.body; 

    try {

        photo = photo != undefined ? photo : '';
        let url = ''
        if (photo != '') {
            let ext = await extension(photo);
            let nombre = v4();
            url = "https://grupof.s3.us-east-2.amazonaws.com/equipos/" + nombre + "." + ext;
            await saveFile(photo,nombre,ext,(res)=>{console.log(res)});
        }

        let sql = "UPDATE Equipo SET nombre=?,fechaFundacion=?,paisID=?";
        const values = [name, foundation_date, id_country];

        if (photo != '') {
            sql += ",fotoLogo=?";
            values.push(url);
        }
        sql += " WHERE equipoID = ?";
        values.push(id);

        pool.query(sql, values, async function(err,result){
            if(err){
                res.status(400).json({status:400, msg: "Error al actualizar equipo.", data: [err]});
            }else{
                await saveBinnacle("UPDATE","Equipo",`Equipo con id: ${id}, actualizado con éxito.`, userID(req.headers.authorization.split(' ')[1]),(res)=>{console.log(res);});
                res.status(200).json({status:200, msg: "Equipo actualizado con éxito.", data: []});
            }
        });
    } catch (error) {
        res.status(400).json({status:400, msg: "Error al actualizar equipo.", data: [error]});
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