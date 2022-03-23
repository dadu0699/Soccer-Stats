const jwt = require('jsonwebtoken');

const generarJWT = (uid: any) => {
    return new Promise((resolve: any, reject: any) => {

        const payload = uid;

        jwt.sign(payload, 'SoftwareAvanzado', {
            expiresIn: '12h'
        }, (err: any, token: any) => {
            if (err) {
                reject('No se puede generar el token.')
            } else {
                resolve(token)
            }
        })

    });
}

export default generarJWT;