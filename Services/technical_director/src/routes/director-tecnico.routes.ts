import DirectorTecnicoController from "../controllers/director-tecnico.controller"
import { Router } from "express";
import ValidarCampos from "../middlewares/validar-campos.middleware";
const { check } = require('express-validator');
const director_tecnico = Router();

director_tecnico.get('/technical-director', DirectorTecnicoController.getInstance().getAll);
director_tecnico.post('/technical-director', [
    check('name', 'El nombre es un campo obligatorio.').not().isEmpty(),
    check('lastname', 'El apellido es un campo obligatorio.').not().isEmpty(),
    check('photo', 'El archivo base64 es un campo obligatorio.').not().isEmpty(),
    check('birth_date', 'La fecha de cumpleaños es un campo obligatorio.').not().isEmpty(),
    check('id_country', 'El id de pais es un campo obligatorio.').not().isEmpty(),
    check('status', 'El estado es un campo obligatorio.').not().isEmpty(),
    ValidarCampos
], DirectorTecnicoController.getInstance().create);
director_tecnico.put('/technical-director', [
    check('id', 'El id es un campo obligatorio.').not().isEmpty(),
    ValidarCampos
], DirectorTecnicoController.getInstance().update);
director_tecnico.delete('/technical-director', DirectorTecnicoController.getInstance().delete);

export default director_tecnico;