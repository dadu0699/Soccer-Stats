const {Router} = require("express");
const router = Router();

const pool = require('../db_connection');

router.post('/transfer-coach', (req, res) => {
    
    res.send("Hello World - transfer-coach")
});

router.get('/transfer-log-coach', (req, res) => {

    res.send("Hello World - transfer-log-coach")
});

module.exports = router;