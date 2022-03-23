import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');

/**
 * MIDDLEWARE PARA VALIDAR JWT
 */
const ValidarJWT = (req: any, res: Response, next: NextFunction) => {
    const authorization = req.header('authorization')
    let token;

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        token = authorization.substring(7);
    }

    if (!token) {
        return res.status(401).send(
            {
                status: 401,
                msj: 'Unauthorized'
            }
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.user = decoded;
        console.log(decoded)
        next();
    } catch (err) {
        return res.status(401).send(
            {
                status: 401,
                msj: 'Unauthorized'
            }
        );
    }

}

export default ValidarJWT;