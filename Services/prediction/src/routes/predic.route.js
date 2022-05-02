const {Router} = require("express");
const router = Router();

const {totalPartidos, totalGolesLocal,totalGolesVisitante, 
    equipoLOCAL_goles_encajados_anotados, equipoVISITANTE_goles_encajados_anotados,
    partidosJugadosComoLocal, partidosJugadosComoVisitante} = require("../models/predic.model");

router.post('/', (req, res) => {

    const {id_teamLocal, id_teamVisitor} = req.body;

    let promedioGolesLocal = 0;
    let promedioGolesVisitante = 0;

    let golesEncajadosEquipoLocal = 0;
    let golesAnotadosEquipoLocal = 0;
    let cantidadPartidosComoLocal = 0;

    let golesEncajadosEquipoVisitante = 0;
    let golesAnotadosEquipoVisitante = 0;
    let cantidadPartidosComoVisitante = 0;

    let fuerzaAtaqueLocal = 0;
    let fuerzaDefensaLocal =0;

    let fuerzaAtaqueVisitante = 0;
    let fuerzaDefensaVisitante =0;

    let golesEsperadosLocal = 0;
    let golesEsperadosVisitante = 0;

    try {
        totalPartidos((totalP)=>{
            totalGolesLocal((totalL) => {
                totalGolesVisitante((totalV)=>{
                    promedioGolesLocal = totalL / totalP;
                    promedioGolesVisitante = totalV / totalP;
                    //console.log(totalP, totalL, totalV, promedioGolesLocal, promedioGolesVisitante);
                    equipoLOCAL_goles_encajados_anotados(id_teamLocal, (localGolesE, localGolesA) => {
                        golesEncajadosEquipoLocal = localGolesE;
                        golesAnotadosEquipoLocal = localGolesA;
                        //console.log("team local ",localGolesE, localGolesA);
                        equipoVISITANTE_goles_encajados_anotados(id_teamVisitor, (visitanteGolesE, visitanteGolesA) => {
                            golesEncajadosEquipoVisitante = visitanteGolesE;
                            golesAnotadosEquipoVisitante = visitanteGolesA;
                            //console.log("team visitor ",visitanteGolesE, visitanteGolesA);
                            partidosJugadosComoLocal(id_teamLocal, (totalPartidosL) => {
                                cantidadPartidosComoLocal = totalPartidosL;
                                //console.log("total partidos local ",totalPartidosL);
                                partidosJugadosComoVisitante(id_teamVisitor, (totalPartidosV) => {
                                    //console.log("total partidos visitante ",totalPartidosV);
                                    cantidadPartidosComoVisitante = totalPartidosV;
    
                                    fuerzaAtaqueLocal = (golesAnotadosEquipoLocal / cantidadPartidosComoLocal) / promedioGolesLocal;
                                    fuerzaDefensaLocal = (golesEncajadosEquipoLocal / cantidadPartidosComoLocal) / promedioGolesVisitante;
    
                                    fuerzaAtaqueVisitante = (golesAnotadosEquipoVisitante / cantidadPartidosComoVisitante) / promedioGolesVisitante;
                                    fuerzaDefensaVisitante = (golesEncajadosEquipoVisitante / cantidadPartidosComoVisitante) / promedioGolesLocal;
    
                                    golesEsperadosLocal = fuerzaAtaqueLocal * fuerzaDefensaVisitante * promedioGolesLocal;
                                    golesEsperadosVisitante = fuerzaAtaqueVisitante * fuerzaDefensaLocal * promedioGolesVisitante;
    
                                    res.status(200).json({status:200, msg: "Prediccion obtenida con éxito.", data: [{golesLocal: Math.round(golesEsperadosLocal), golesVisitor: Math.round(golesEsperadosVisitante)}]});
                                });
                            });                        
                        });                    
                    });
                });
            });
        });
    } catch (error) {
        res.status(400).json({status:400, msg: "Error al obtener prediccion.", data: [error]});
    }

});

module.exports = router;