const {Router} = require("express");
const router = Router();

const pool = require('../db_connection');

router.post('/soccer-game', (req, res) => {
    res.send("Hello World - crear partido")
});

router.put('/soccer-game', (req, res) => {
    //update general y tambien update de solo el estado
    res.send("Hello World - actualizar partido")
});

router.get('/soccer-game', (req, res) => {

    //si viene id en query params, solo ese
    //sino todos

    res.send("Hello World - ver partido")
});

router.delete('/soccer-game', (req, res) => {
    res.send("Hello World - eliminar partido")
});

module.exports = router;