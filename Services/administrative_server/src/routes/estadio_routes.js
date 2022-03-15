const {Router} = require("express");
const router = Router();

const pool = require('../db_connection');

router.post('/stadium', (req, res) => {
    res.send("Hello World - crear estadio")
});

router.put('/stadium', (req, res) => {
    res.send("Hello World - actualizar estadio")
});

router.get('/stadium', (req, res) => {

    //si viene id en query params, solo ese
    //sino todos

    res.send("Hello World - ver estadio")
});

router.delete('/stadium', (req, res) => {
    res.send("Hello World - eliminar estadio")
});

module.exports = router;