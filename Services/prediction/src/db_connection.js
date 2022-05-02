var mysql = require("mysql");
var keys = require("./keys_db");
var pool = mysql.createPool(keys);

pool.getConnection(function(err){
    if(err) throw err;
    console.log("DB MySQL is connected");
});

module.exports = pool;