const {Router} = require("express");
const router = Router();

const pool = require('../db_connection');

router.post('/transfer-player', (req, res) => {
    
    res.send("Hello World - transfer-player")
});

router.get('/transfer-log', (req, res) => {

    res.send("Hello World - transfer-log")
});

module.exports = router;