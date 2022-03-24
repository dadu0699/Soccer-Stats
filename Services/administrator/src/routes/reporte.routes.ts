import { Router } from "express";
import ValidarJWT from "../middlewares/validar-jwt.middleware";
import ValidarRol from "../middlewares/validar-rol.middleware";
import ReporteController from "../controllers/reporte.controller";
const reporte = Router();

reporte.get('/report/1', [
    ValidarJWT,
    ValidarRol(),
], ReporteController.getInstance().reporte1);
reporte.get('/report/2', [
    ValidarJWT,
    ValidarRol(),
], ReporteController.getInstance().reporte2);
reporte.get('/report/3', [
    ValidarJWT,
    ValidarRol(),
], ReporteController.getInstance().reporte3);
reporte.get('/report/4', [
    ValidarJWT,
    ValidarRol(),
], ReporteController.getInstance().reporte4);
reporte.get('/report/5', [
    ValidarJWT,
    ValidarRol(),
], ReporteController.getInstance().reporte5);

export default reporte;