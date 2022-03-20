const {Router} = require("express");
const router = Router();

const pool = require('../db_connection');
const jwt = require('jsonwebtoken');

router.post('/competition', [verificarToken,isAdminOrEmployee], (req, res) => {
    
    const {name, type, year, champion_team, country} = req.body;

    let sql = "INSERT INTO Competencia (nombre, anio, tipo, equipoCampeonID, paisID) VALUES(?,?,?,?,?);";

    try {
        //insertando a DB, sin URL de foto aun
        pool.query(sql, [name,year,type,champion_team,country], function(err,result){
            if(err){
                console.log(err);
                res.status(200).json({status:500, msj: "Error al agregar Competencia", data: "Error al agregar Competencia"});
            }else{
                res.status(200).json({status:200, msj: "Competencia agregada", data: "Competencia agregada"});
            }
        });
    } catch (error) {
        res.status(200).json({status:500, msj: "Error al agregar Competencia", data: "Error al agregar Competencia"});
    }
});

router.put('/competition', [verificarToken,isAdminOrEmployee], (req, res) => {
    
    const {id_competition, name, type, year, champion_team, country} = req.body;

    let sql = "UPDATE Competencia SET nombre=?, anio=?, tipo=?, equipoCampeonID=?, paisID=? WHERE competenciaID = ?";

    try {
        //insertando a DB, sin URL de foto aun
        pool.query(sql, [name,year,type,champion_team,country,id_competition], function(err,result){
            if(err){
                console.log(err);
                res.status(200).json({status:500, msj: "Error al actualizar Competencia", data: "Error al actualizar Competencia"});
            }else{
                res.status(200).json({status:200, msj: "Competencia actualizada", data: "Competencia actualizada"});
            }
        });
    } catch (error) {
        res.status(200).json({status:500, msj: "Error al actualizar Competencia", data: "Error al actualizar Competencia"});
    }
});

router.get('/competition/:championship', [verificarToken,isAdminOrEmployee], (req, res) => {

    const id = req.params.championship;

    var sql = `SELECT Competencia.competenciaID as "id_competition", Competencia.nombre as "name", Competencia.anio as "year", 
               Competencia.tipo as "type", Competencia.equipoCampeonID as "champion_team ", Competencia.paisID as "id_country ", Pais.nombre2 as "country" 
               FROM Competencia 
               JOIN Pais ON Pais.paisID = Competencia.paisID AND Competencia.competenciaID = ${id};`

    try {
        pool.query(sql,function(err, result, fields){
            if (err) {
                res.status(200).json({status:500, msj: "Error al leer Competencia", data: "Error al leer Competencia"});
            }else{
                res.status(200).json({status:200, msj: "Competencia leida", data: result});
            }
        });
    } catch (error) {
        res.status(200).json({status:500, msj: "Error al leer Competencia", data: "Error al leer Competencia"});
    }
});

router.get('/competition', [verificarToken,isAdminOrEmployee], (req, res) => {

    var sql = ` SELECT Competencia.competenciaID as "id_competition", Competencia.nombre as "name", Competencia.anio as "year", 
                Competencia.tipo as "type", Competencia.equipoCampeonID as "champion_team ", Competencia.paisID as "id_country ", Pais.nombre2 as "country" 
                FROM Competencia 
                JOIN Pais ON Pais.paisID = Competencia.paisID;`

    try {
        pool.query(sql,function(err, result, fields){
            if (err) {
                res.status(200).json({status:500, msj: "Error al leer Competencias", data: "Error al leer Competencias"});
            }else{
                res.status(200).json({status:200, msj: "Competencias leidas", data: result});
            }
        });
    } catch (error) {
        res.status(200).json({status:500, msj: "Error al leer Competencias", data: "Error al leer Competencias"});
    }
});

router.delete('/competition/:id', [verificarToken,isAdminOrEmployee], (req, res) => {
    
    const id = req.params.id;

    let sql = 'DELETE FROM Competencia WHERE competenciaID = ?';

    try {
        //insertando a DB, sin URL de foto aun
        pool.query(sql, [id], function(err,result){
            if(err){
                console.log(err);
                res.status(200).json({status:500, msj: "Error al eliminar Competencia", data: "Error al eliminar Competencia"});
            }else{
                res.status(200).json({status:200, msj: "Competencia eliminada", data: "Competencia eliminada"});
            }
        });
    } catch (error) {
        res.status(200).json({status:500, msj: "Error al eliminar Competencia", data: "Error al eliminar Competencia"});
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