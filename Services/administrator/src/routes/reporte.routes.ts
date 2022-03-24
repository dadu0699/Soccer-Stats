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
reporte.get('/report/6', [
    ValidarJWT,
    ValidarRol(),
], ReporteController.getInstance().reporte6);
reporte.get('/report/7', [
    ValidarJWT,
    ValidarRol(),
], ReporteController.getInstance().reporte7);
reporte.get('/report/8', [
    ValidarJWT,
    ValidarRol(),
], ReporteController.getInstance().reporte8);
reporte.get('/report/9', [
    ValidarJWT,
    ValidarRol(),
], ReporteController.getInstance().reporte9);
reporte.get('/report/10', [
    ValidarJWT,
    ValidarRol(),
], ReporteController.getInstance().reporte10);

export default reporte;