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

function totalGolesLocal(done) {
    const sql = "select sum(resultadoLocal) as total from partido;";

    try {
        pool.query(sql,function(err, result, fields){
            if (err) {
                done(0);
            }else{
                const total = result[0].total;
                done(total);
            }
        });
    } catch (error) {
        done(0);
    }
}

function totalGolesVisitante(done) {
    const sql = "select sum(resultadoVisitante) as total from partido;";

    try {
        pool.query(sql,function(err, result, fields){
            if (err) {
                done(0);
            }else{
                const total = result[0].total;
                done(total);
            }
        });
    } catch (error) {
        done(0);
    }
}

function equipoLOCAL_goles_encajados_anotados(id, done){
    const sql = `select sum(resultadoVisitante) as golesE, sum(resultadoLocal) as golesA from partido where equipoLocalID = ${1};`;

    try {
        pool.query(sql,function(err, result, fields){
            if (err) {
                done(0);
            }else{
                const golesE = result[0].golesE;
                const golesA = result[0].golesA;
                done(golesE, golesA);
            }
        });
    } catch (error) {
        done(0);
    }
}

module.exports = {totalPartidos, totalGolesLocal, totalGolesVisitante, equipoLOCAL_goles_encajados_anotados};