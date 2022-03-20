const {Router} = require("express");
const router = Router();

const pool = require('../db_connection');

router.post('/add-incidence', (req, res) => {
    
    //falta por definir parametros, en doc endpoints
    res.send("Hello World - agregar incidencia");

});

module.exports = router;