const pool = require('../db_connection');

async function saveBinnacle(accion,nombreTabla,registro,usuarioID,done){

    let sql = "INSERT INTO Bitacora (accion, nombreTabla, registro, usuarioID) VALUES(?,?,?,?);";

    try {
        pool.query(sql, [accion,nombreTabla,registro,usuarioID], async function(err,result){
            if(err){
                console.log("bitacora",err);
                done("competition action no registered in the binnacle");
            }else{
                done("competition action registered in the binnacle");
            }
        });
    } catch (error) {
        console.log("bitacora",err);
    }
}

module.exports = {saveBinnacle};