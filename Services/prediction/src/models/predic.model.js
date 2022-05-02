const pool = require('../db_connection');

function totalPartidos(done) {
    const sql = "select count(partidoID) as total from partido;";

    try {
        pool.query(sql,function(err, result, fields){
            if (err) {
                done(1);
            }else{
                const total = result[0].total;
                done(total);
            }
        });
    } catch (error) {
        done(1);
    }
}

module.exports = {totalPartidos};