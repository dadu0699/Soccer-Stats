const {Router} = require("express");
const router = Router();

const pool = require('../db_connection');

router.put('/update-person', (req, res) => {
    
    
    res.send("Hello World - update-person");

});


module.exports = router;