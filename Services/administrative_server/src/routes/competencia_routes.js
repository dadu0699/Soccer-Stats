const {Router} = require("express");
const router = Router();

const pool = require('../db_connection');

router.post('/competition', (req, res) => {
    res.send("Hello World - crear competition")
});

router.put('/competition', (req, res) => {
    res.send("Hello World - actualizar competition")
});

router.get('/competition', (req, res) => {

    //si viene championship en query params, solo esa
    //sino todos

    res.send("Hello World - ver competition")
});

router.delete('/competition', (req, res) => {
    
    // viene id en params
    res.send("Hello World - eliminar competition")
});

module.exports = router;