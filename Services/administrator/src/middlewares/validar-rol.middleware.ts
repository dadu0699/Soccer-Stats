import { NextFunction, Request, Response } from "express";

/**
 * MIDDLEWARE PARA VALIDAR ROLES
 */
const ValidarRol = () => {
    return (req: any, res: Response, next: NextFunction) => {

        if (!req.user) {
            return res.status(401).json({
                status: 401,
                msg: 'Se quiere verificar rol sin validar token primero.'
            })
        }

        const { id_rol } = req.user;

        if (id_rol != 1) {
            return res.status(401).json({
                status: 401,
                msg: `El usuario no tiene privilegios de usuario Administrador.`
            })
        }

        next()
    }
}


export default ValidarRol;