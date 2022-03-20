const {Router} = require("express");
const router = Router();
const pool = require('../db_connection');
const jwt = require('jsonwebtoken');
var aws = require('aws-sdk');
const s3 = new aws.S3({region: process.env.S3_REGION, accessKeyId: process.env.S3_ACCESS_KEY_ID, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY});

router.post('/team', [verificarToken,isAdminOrEmployee], async (req, res) => {
    
    const {name, fundation_date, id_country, photo} = req.body;

    try {
        //formateando base64
        let inicio = photo.indexOf(',')+1;
        let fin = photo.length;
        const newBase64 = await photo.substring(inicio,fin);

        //convirtiendo a base64
        let buff = await new Buffer.from(newBase64, 'base64');  

        let sql = "INSERT INTO Equipo (nombre, fechaFundacion, fotoLogo, paisID) VALUES(?,?,?,?);";

        //insertando a DB, sin URL de foto aun
        pool.query(sql, [name,fundation_date,"photo",id_country], async function(err,result){
            if(err){
                res.status(200).json({status:500, msj: "Error al agregar Equipo", data: "Error al agregar Equipo"});
            }else{
                //obteniendo id del estadio
                let idd = result.insertId;
                let params ={
                    Bucket: process.env.S3_BUCKET,
                    Key: "equipos/"+idd+"."+"jpg",
                    Body: buff
                };

                //guardando en s3
                await s3.putObject(params).promise().then(res=>console.log(res)).catch(err=>console.log(err));
                
                //actualizando URL de estadio
                let sql2 = "UPDATE Equipo SET fotoLogo=? WHERE equipoID = ?";
                let newURL = "https://grupof.s3.us-east-2.amazonaws.com/equipos/"+idd+".jpg";

                pool.query(sql2, [newURL,idd], function(err,result){
                    //if (err) throw err;
                    if(err){
                        res.status(200).json({status:500, msj: "Error al agregar Equipo", data: "Error al agregar Equipo"});
                    }else{
                        res.status(200).json({status:200, msj: "Equipo agregado", data: "Equipo agregado"});
                    }
                });
            }
        });
        
    } catch (error) {
        res.status(200).json({status:500, msj: "Error al agregar Equipo", data: "Error al agregar Equipo"});
    }
    
});

router.put('/team', [verificarToken,isAdminOrEmployee], async (req, res) => {
    
    const {id, name, fundation_date, id_country, photo} = req.body;

    try {

        //formateando base64
        let inicio = photo.indexOf(',')+1;
        let fin = photo.length;
        const newBase64 = await photo.substring(inicio,fin);

        //convirtiendo a base64
        let buff = await new Buffer.from(newBase64, 'base64');

        let sql = "UPDATE Equipo SET nombre=?,fechaFundacion=?,paisID=? WHERE equipoID = ?";
    
        pool.query(sql, [name,fundation_date,id_country,id], async function(err,result){
            if(err){
                res.status(200).json({status:500, msj: "Error al actualizar Equipo", data: "Error al actualizar Equipo"});
            }else{
                let params ={
                    Bucket: process.env.S3_BUCKET,
                    Key: "equipos/"+id+"."+"jpg",
                    Body: buff
                };

                //actualizando foto en s3
                await s3.putObject(params).promise().then(res=>console.log(res)).catch(err=>console.log(err));
                res.status(200).json({status:200, msj: "Equipo actualizado", data: "Equipo actualizado"});
            }
        });
    } catch (error) {
        res.status(200).json({status:500, msj: "Error al actualizar Equipo", data: "Error al actualizar Equipo"});
    }
});

router.get('/team/:id', [verificarToken,isAdminOrEmployee], (req, res) => {

    const id = req.params.id;

    var sql = `SELECT Equipo.equipoID as "id", Equipo.nombre as "name", Equipo.fechaFundacion as "fundation_date ", Equipo.paisID as "id_country", Equipo.fotoLogo as "photo"
               FROM Equipo WHERE Equipo.equipoID = ${id};`

    try {
        pool.query(sql,function(err, result, fields){
            if (err) {
                res.status(200).json({status:500, msj: "Error al leer Equipo", data: "Error al leer Equipo"});
            }else{
                res.status(200).json({status:200, msj: "Equipo leido", data: result});
            }
        });
    } catch (error) {
        res.status(200).json({status:500, msj: "Error al leer Equipo", data: "Error al leer Equipo"});
    }
});

router.get('/team', [verificarToken,isAdminOrEmployee], (req, res) => {

    var sql = `SELECT Equipo.equipoID as "id", Equipo.nombre as "name", Equipo.fechaFundacion as "fundation_date ", Equipo.paisID as "id_country", Equipo.fotoLogo as "photo"
               FROM Equipo;`

    try {
        pool.query(sql,function(err, result, fields){
            if (err) {
                res.status(200).json({status:500, msj: "Error al leer Equipo", data: "Error al leer Equipo"});
            }else{
                res.status(200).json({status:200, msj: "Equipo leido", data: result});
            }
        });
    } catch (error) {
        res.status(200).json({status:500, msj: "Error al leer Equipo", data: "Error al leer Equipo"});
    }
});

router.delete('/team/:id', [verificarToken,isAdminOrEmployee], (req, res) => {
    
    const id = req.params.id;

    let sql = 'DELETE FROM Equipo WHERE equipoID = ?';

    try {
        pool.query(sql, [id], function(err, result){
            if(err){
                res.status(200).json({status:500, msj: "Error al eliminar Equipo", data: "Error al eliminar Equipo"});
            }else{
                res.status(200).json({status:200, msj: "Equipo eliminado", data: "Equipo eliminado"});
            }
        });
    } catch (error) {
        res.status(200).json({status:500, msj: "Error al eliminar Equipo", data: "Error al eliminar Equipo"});
    }
});

function verificarToken(req, res, next){
    //valido si viene cabecera de autorizacion
    if(!req.headers.authorization){
        return res.status(200).json({status:401, msj: "No autorizado", data: "No autorizado"});
    }

    //valido si no esta vacio
    const token = req.headers.authorization.split(' ')[1];
    if(token==='null'){
        return res.status(200).json({status:401, msj: "No autorizado", data: "No autorizado"});
    }

    try {
        //Verifico token
        const contenido = jwt.verify(token, process.env.SECRET_JWT_SEED);
        
        if(!contenido){
            return res.status(200).json({status:401, msj: "No autorizado", data: "No autorizado"});
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(200).json({status:401, msj: "No autorizado", data: "No autorizado"});
    }
}

function isAdminOrEmployee(req, res, next){
       
    try {
        //ya no valida si viene cabecera o si es null, la funcion verificarToken se encarga de eso
        const token = req.headers.authorization.split(' ')[1];
        const contenido = jwt.verify(token, process.env.SECRET_JWT_SEED);

        if(contenido.id_rol == 1 || contenido.id_rol == 2){
            next();
        }else{
             return res.status(200).json({status:401, msj: "No autorizado", data: "No autorizado"});
        }

    } catch (error) {
        console.log(error);
        return res.status(200).json({status:401, msj: "No autorizado", data: "No autorizado"});
    }
}

module.exports = router;