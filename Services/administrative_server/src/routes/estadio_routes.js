const {Router} = require("express");
const router = Router();

const pool = require('../db_connection');

router.post('/stadium', (req, res) => {

    const {name, fundation_date, capacity, id_country, address, state, photo} = req.body;

    let sql = "INSERT INTO Estadio (nombre, capacidad, direccion, estado, foto, paisID) VALUES(?,?,?,?,?,?);";

    try {
        pool.query(sql, [name,capacity,address,state,"photo",id_country], function(err,result){
            //if (err) throw err;
            if(err){
                res.status(200).json({status:500, msj: "Error al agregar Estadio", data: "Error al agregar Estadio"});
            }else{
                res.status(200).json({status:200, msj: "Estadio agregado", data: "Estadio agregado"});
            }
        });
    } catch (error) {
        res.status(200).json({status:500, msj: "Error al agregar Estadio", data: "Error al agregar Estadio"});
    }
    
});

router.put('/stadium', (req, res) => {
    
    const {id, name, fundation_date, capacity, id_country, address, state, photo} = req.body;

    let sql = "UPDATE Estadio SET nombre=?,capacidad=?,direccion=?,estado=?,foto=?,paisID=? WHERE estadioID = ?";

    try {
        pool.query(sql, [name,capacity,address,state,"photo",id_country,id], function(err,result){
            //if (err) throw err;
            if(err){
                res.status(200).json({status:500, msj: "Error al actualizar Estadio", data: "Error al actualizar Estadio"});
            }else{
                res.status(200).json({status:200, msj: "Estadio actualizado", data: "Estadio actualizado"});
            }
        });
    } catch (error) {
        res.status(200).json({status:500, msj: "Error al actualizar Estadio", data: "Error al actualizar Estadio"});
    }
});

router.get('/stadium/:id', (req, res) => {

    const id = req.params.id;

    var sql = `SELECT nombre, capacidad, direccion, estado, foto, paisID FROM Estadio WHERE estadioID = ${id}`

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

router.get('/stadium', (req, res) => {

    var sql = `SELECT nombre, capacidad, direccion, estado, foto, paisID FROM Estadio`

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

router.delete('/stadium/:id', (req, res) => {
    
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

module.exports = router;