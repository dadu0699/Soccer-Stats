import UsuarioController from "../controllers/usuario.controller"
import { Router } from "express";
import ValidarCampos from "../middlewares/validar-campos.middleware";
import ValidarJWT from "../middlewares/validar-jwt.middleware";
import ValidarRol from "../middlewares/validar-rol.middleware";
const { check } = require('express-validator');
const usuario = Router();

usuario.get('/user', [
    ValidarJWT,
    ValidarRol(),
], UsuarioController.getInstance().getAll);
usuario.post('/user', [
    ValidarJWT,
    ValidarRol(),
    check('name', 'El nombre es un campo obligatorio.').not().isEmpty(),
    check('lastname', 'El apellido es un campo obligatorio.').not().isEmpty(),
    check('email', 'El correo es un campo obligatorio.').not().isEmpty(),
    check('email', 'El correo no es válido.').isEmail(),
    check('password', 'La contraseña es un campo obligatorio.').not().isEmpty(),
    check('phone', 'El teléfono es un campo obligatorio.').not().isEmpty(),
    check('photo', 'El archivo base64 es un campo obligatorio.').not().isEmpty(),
    check('gender', 'El género es un campo obligatorio.').not().isEmpty(),
    check('birth_date', 'La fecha de cumpleaños es un campo obligatorio.').not().isEmpty(),
    check('address', 'La dirección es un campo obligatorio.').not().isEmpty(),
    check('id_country', 'El id de pais es un campo obligatorio.').not().isEmpty(),
    check('id_rol', 'El id de rol es un campo obligatorio.').not().isEmpty(),
    ValidarCampos
], UsuarioController.getInstance().create);
usuario.put('/user/status', [
    ValidarJWT,
    ValidarRol(),
    check('id', 'El id es un campo obligatorio.').not().isEmpty(),
    check('id_status', 'El estado es un campo obligatorio.').not().isEmpty(),
    check('description', 'La descripcion es un campo obligatorio.').not().isEmpty(),
    ValidarCampos
], UsuarioController.getInstance().changeState);

export default usuario;