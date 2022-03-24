const jwt = require('jsonwebtoken');

function verificarToken(req, res, next){
    //valido si viene cabecera de autorizacion
    if(!req.headers.authorization){
        return res.status(401).json({status:401, msg: "Unauthorized", data: "Unauthorized"});
    }

    //valido si no esta vacio
    const token = req.headers.authorization.split(' ')[1];
    if(token==='null'){
        return res.status(401).json({status:401, msg: "Unauthorized", data: "Unauthorized"});
    }

    try {
        //Verifico token
        const contenido = jwt.verify(token, process.env.SECRET_JWT_SEED);
        
        if(!contenido){
            return res.status(401).json({status:401, msg: "Unauthorized", data: "Unauthorized"});
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({status:401, msg: "Unauthorized", data: "Unauthorized"});
    }
}

function isAdminOrEmployee(req, res, next){
       
    try {
        //ya no valida si viene cabecera o si es null, la funcion verificarToken se encarga de eso
        const token = req.headers.authorization.split(' ')[1];
        const contenido = jwt.verify(token, process.env.SECRET_JWT_SEED);

        if(contenido.id_rol == 1 || contenido.id_rol == 2){
            next();
        }else{
             return res.status(401).json({status:401, msg: "Unauthorized", data: "Unauthorized"});
        }

    } catch (error) {
        console.log(error);
        return res.status(401).json({status:401, msg: "Unauthorized", data: "Unauthorized"});
    }
}

function userID(token){
    return jwt.verify(token, process.env.SECRET_JWT_SEED).id_rol;
}

module.exports = {verificarToken,isAdminOrEmployee,userID};