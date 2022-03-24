const {Router} = require("express");
const pool = require('../db_connection');
const {v4} = require("uuid");
const router = Router();

const {saveFile} = require("../utils/aws.s3");
const {verificarToken,isAdminOrEmployee,userID} = require("../utils/jwt");
const {saveBinnacle} = require("../utils/binnacle");

router.put('/', [verificarToken,isAdminOrEmployee], async (req, res) => {
    
    const { id, name, foundation_date, capacity, id_country, address, state } = req.body;
    let { photo } = req.body; 

    try {
        if (id == undefined) {
            throw new Error('El id es requerido');
        }

        photo = photo != undefined ? photo : '';
        let url = ''
        if (photo != '') {
            let ext = await extension(photo);
            let nombre = v4();
            url = "https://grupof.s3.us-east-2.amazonaws.com/estadios/" + nombre + "." + ext;
            await saveFile(photo,nombre,ext,(res)=>{console.log(res)});
        }

        let sql = "UPDATE Estadio SET nombre=?,fechaFundacion=?,capacidad=?,direccion=?,estado=?,paisID=?";
        const values = [name, foundation_date, capacity, address, state, id_country];

        if (photo != '') {
            sql += ",foto=?";
            values.push(url);
        }
        sql += " WHERE estadioID = ?";
        values.push(id);

        pool.query(sql, values, async function(err,result){
            if(err){
                res.status(400).json({status:400, msg: "Error al actualizar Estadio.", data: [err]});
            }else{
                await saveBinnacle("UPDATE","Estadio",`Estadio con id: ${id}, actualizado con éxito.`, userID(req.headers.authorization.split(' ')[1]),(res)=>{console.log(res);});
                res.status(200).json({status:200, msg: "Estadio actualizado con éxito.", data: []});
            }
        });
    } catch (error) {
        res.status(400).json({status:400, msg: "Error al actualizar Estadio.", data: [error]});
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