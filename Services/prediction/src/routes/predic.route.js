const {Router} = require("express");
const router = Router();

const {totalPartidos, totalGolesLocal,totalGolesVisitante, equipoLOCAL_goles_encajados_anotados, equipoVISITANTE_goles_encajados_anotados} = require("../models/predic.model");

router.post('/', (req, res) => {

    const {id_teamLocal, id_teamVisitor} = req.body;
    var promedioGolesLocal = 0;
    let promedioGolesVisitante = 0; 

    

});

module.exports = router;