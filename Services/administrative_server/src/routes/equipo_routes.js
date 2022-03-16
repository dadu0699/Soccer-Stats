const {Router} = require("express");
const router = Router();

const pool = require('../db_connection');

router.post('/team', (req, res) => {
    res.send("Hello World - crear partido")
});

router.put('/team', (req, res) => {
    res.send("Hello World - actualizar partido")
});

router.get('/team', (req, res) => {

    //si viene id en query params, solo ese
    //sino todos

    res.send("Hello World - ver partidos")
});

router.delete('/team', (req, res) => {
    res.send("Hello World - eliminar partido")
});

module.exports = router;