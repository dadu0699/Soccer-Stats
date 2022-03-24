import { NextFunction, Request, Response } from "express";
const { validationResult } = require('express-validator');

/**
 * MIDDLEWARE PARA VALIDAR CAMPOS
 */
const ValidarCampos = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            msg: "Revisar campos faltantes",
            data: errors
        })
    }

    next();
}

export default ValidarCampos;