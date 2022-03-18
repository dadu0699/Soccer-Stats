const {Router} = require("express");
const router = Router();
const pool = require('../db_connection');
const jwt = require('jsonwebtoken');
var aws = require('aws-sdk');
const s3 = new aws.S3({region: process.env.S3_REGION, accessKeyId: process.env.S3_ACCESS_KEY_ID, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY});

router.post('/stadium', [verificarToken,isAdminOrEmployee], async (req, res) => {

    const {name, fundation_date, capacity, id_country, address, state, photo} = req.body;

    try {
        //formateando base64
        let inicio = photo.indexOf(',')+1;
        let fin = photo.length;
        const newBase64 = await photo.substring(inicio,fin);

        //convirtiendo a base64
        let buff = await new Buffer.from(newBase64, 'base64');  

        let sql = "INSERT INTO Estadio (nombre, fechaFundacion, capacidad, direccion, estado, foto, paisID) VALUES(?,?,?,?,?,?,?);";

        //insertando a DB, sin URL de foto aun
        pool.query(sql, [name,fundation_date,capacity,address,state,"photo",id_country], async function(err,result){
            if(err){
                res.status(200).json({status:500, msj: "Error al agregar Estadio", data: "Error al agregar Estadio"});
            }else{
                //obteniendo id del estadio
                let idd = result.insertId;
                let params ={
                    Bucket: process.env.S3_BUCKET,
                    Key: "estadios/"+idd+"."+"jpg",
                    Body: buff
                };

                //guardando en s3
                await s3.putObject(params).promise().then(res=>console.log(res)).catch(err=>console.log(err));
                
                //actualizando URL de estadio
                let sql2 = "UPDATE Estadio SET foto=? WHERE estadioID = ?";
                let newURL = "https://grupof.s3.us-east-2.amazonaws.com/estadios/"+idd+".jpg";

                pool.query(sql2, [newURL,idd], function(err,result){
                    //if (err) throw err;
                    if(err){
                        res.status(200).json({status:500, msj: "Error al agregar Estadio", data: "Error al agregar Estadio"});
                    }else{
                        res.status(200).json({status:200, msj: "Estadio agregado", data: "Estadio agregado"});
                    }
                });
            }
        });
    } catch (error) {
        res.status(200).json({status:500, msj: "Error al agregar Estadio", data: "Error al agregar Estadio"});
    }
    
});

router.put('/stadium', [verificarToken,isAdminOrEmployee], async (req, res) => {
    
    const {id, name, fundation_date, capacity, id_country, address, state, photo} = req.body;

    try {

        //formateando base64
        let inicio = photo.indexOf(',')+1;
        let fin = photo.length;
        const newBase64 = await photo.substring(inicio,fin);

        //convirtiendo a base64
        let buff = await new Buffer.from(newBase64, 'base64');

        let sql = "UPDATE Estadio SET nombre=?,fechaFundacion=?,capacidad=?,direccion=?,estado=?,paisID=? WHERE estadioID = ?";
    
        pool.query(sql, [name,fundation_date,capacity,address,state,id_country,id], async function(err,result){
            if(err){
                res.status(200).json({status:500, msj: "Error al actualizar Estadio", data: "Error al actualizar Estadio"});
            }else{
                let params ={
                    Bucket: process.env.S3_BUCKET,
                    Key: "estadios/"+id+"."+"jpg",
                    Body: buff
                };

                //actualizando foto en s3
                await s3.putObject(params).promise().then(res=>console.log(res)).catch(err=>console.log(err));
                res.status(200).json({status:200, msj: "Estadio actualizado", data: "Estadio actualizado"});
            }
        });
    } catch (error) {
        res.status(200).json({status:500, msj: "Error al actualizar Estadio", data: "Error al actualizar Estadio"});
    }
});

router.get('/stadium/:id', [verificarToken,isAdminOrEmployee], (req, res) => {

    const id = req.params.id;

    var sql = `SELECT Estadio.EstadioID as "id", Estadio.nombre as "name", Estadio.fechaFundacion as "fundation_date", Estadio.capacidad as "capacity", 
                Estadio.paisID as "id_country", Pais.nombre2 as "country ", Estadio.direccion as "address", Estadio.estado as "state", Estadio.foto as "photo" 
                FROM Estadio JOIN Pais ON Pais.PaisID = Estadio.PaisID WHERE Estadio.estadioID = ${id};`

    try {
        pool.query(sql,function(err, result, fields){
            if (err) {
                res.status(200).json({status:500, msj: "Error al leer Estadio", data: "Error al leer Estadio"});
            }else{
                res.status(200).json({status:200, msj: "Estadio leido", data: result});
            }
        });
    } catch (error) {
        res.status(200).json({status:500, msj: "Error al leer Estadio", data: "Error al leer Estadio"});
    }
});

router.get('/stadium', [verificarToken,isAdminOrEmployee], (req, res) => {

    var sql = `SELECT Estadio.EstadioID as "id", Estadio.nombre as "name", Estadio.fechaFundacion as "fundation_date", Estadio.capacidad as "capacity", 
    Estadio.paisID as "id_country", Pais.nombre2 as "country ", Estadio.direccion as "address", Estadio.estado as "state", Estadio.foto as "photo" 
    FROM Estadio JOIN Pais ON Pais.PaisID = Estadio.PaisID;`

    try {
        pool.query(sql,function(err, result, fields){
            if (err) {
                res.status(200).json({status:500, msj: "Error al leer Estadios", data: "Error al leer Estadios"});
            }else{
                res.status(200).json({status:200, msj: "Estadios leidos", data: result});
            }
        });
    } catch (error) {
        res.status(200).json({status:500, msj: "Error al leer Estadios", data: "Error al leer Estadios"});
    }
});

router.delete('/stadium/:id', [verificarToken,isAdminOrEmployee], (req, res) => {
    
    const id = req.params.id;

    let sql = 'DELETE FROM Estadio WHERE estadioID = ?';

    try {
        pool.query(sql, [id], function(err, result){
            if(err){
                res.status(200).json({status:500, msj: "Error al eliminar Estadio", data: "Error al eliminar Estadio"});
            }else{
                res.status(200).json({status:200, msj: "Estadio eliminado", data: "Estadio eliminado"});
            }
        });
    } catch (error) {
        res.status(200).json({status:500, msj: "Error al eliminar Estadio", data: "Error al eliminar Estadio"});
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