import { Request, Response } from 'express';
import Usuario from '../models/usuario.model';
import CryptoJS = require("crypto-js");
import UploadFile from '../utils/aws-s3.util';
import BitacoraController from './bitacora.controller';

const dispatchEmail = require('../middlewares/email');

export default class UsuarioController {
    private static _instance: UsuarioController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * OBTENER TODO EL MODELO
     */
    getAll = async (req: Request, res: Response) => {
        const { id } = req.query;

        if (id == null) {
            const data = await Usuario.findAll({
                attributes: {
                    exclude: ['claveAcceso'],
                },
                include: ['pais']
            });

            let usuarios = data.map((usuario: any) => {
                return {
                    id: usuario.usuarioID,
                    name: usuario.nombre,
                    lastname: usuario.apellido,
                    email: usuario.correo,
                    phone: usuario.telefono,
                    photo: usuario.fotografia,
                    gender: usuario.genero,
                    birth_date: usuario.fechaNacimiento,
                    signup_date: usuario.fechaHoraClaveAcceso,
                    address: usuario.direccion,
                    id_country: usuario.paisID,
                    id_status: usuario.estado,
                    country: usuario.pais.nombre,
                    id_rol: usuario.rol,
                    age: this.getAge(usuario.fechaNacimiento)
                }
            })

            return res.json({
                status: 200,
                msg: "Usuario(s) obtenido(s) con éxito.",
                data: usuarios
            });
        } else {
            const data: any = await Usuario.findByPk(Number(id), {
                attributes: {
                    exclude: ['claveAcceso']
                },
                include: ['pais']
            });
            if (data) {
                return res.json({
                    status: 200,
                    msg: "Usuario(s) obtenido(s) con éxito.",
                    data: [{
                        id: data.usuarioID,
                        name: data.nombre,
                        lastname: data.apellido,
                        email: data.correo,
                        phone: data.telefono,
                        photo: data.fotografia,
                        gender: data.genero,
                        birth_date: data.fechaNacimiento,
                        signup_date: data.fechaHoraClaveAcceso,
                        address: data.direccion,
                        id_country: data.paisID,
                        id_status: data.estado,
                        country: data.pais.nombre,
                        id_rol: data.rol,
                        age: this.getAge(data.fechaNacimiento)
                    }]
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    msg: "Error al obtener usuario(s).",
                    data: []
                })
            }
        }
    }

    /**
     * REGISTRAR ADMINISTRADOR
     */
    create = async (req: any, res: Response) => {
        const { body } = req;

        let objUsuario = {
            nombre: body.name,
            apellido: body.lastname,
            correo: body.email,
            claveAcceso: body.password,
            telefono: body.phone,
            fotografia: '',
            genero: body.gender,
            fechaNacimiento: body.birth_date,
            direccion: body.address,
            paisID: body.id_country,
            rol: body.id_rol,
            estado: "1",
        }

        try {
            const existeEmail = await Usuario.findOne({
                where: {
                    correo: objUsuario.correo
                }
            });

            if (existeEmail) {
                return res.status(400).json({
                    status: 400,
                    msg: "Error al guardar el usuario.",
                    data: []
                })
            }

            let url: any;

            let extension = this.extension(body.photo)
            let base64 = body.photo.replace(`data:image/${this.extensionRemove(body.photo)};base64,`, '')

            await UploadFile(base64, extension).then((data) => url = data);

            if (url == null) {
                return res.status(400).json({
                    status: 400,
                    msg: "Error al guardar el usuario.",
                    data: []
                })
            }

            //INCRUSTAR IMAGEN
            objUsuario.fotografia = 'https://grupof.s3.us-east-2.amazonaws.com/' + url.Key;

            // ENCRIPTAR CONTRASENA
            const credentials = objUsuario.claveAcceso;
            const keyCrypto = CryptoJS.enc.Hex.parse(String(process.env.CRYPTO_KEY));
            const iv = CryptoJS.enc.Hex.parse(String(process.env.CRYPTO_IV));
            objUsuario.claveAcceso = CryptoJS.AES.encrypt(objUsuario.claveAcceso, keyCrypto, { iv }).toString();

            await dispatchEmail(objUsuario.correo, 'Welcome!', 'mail', {
                url: `${process.env.FRONTEND}/auth/login`,
                password: credentials
            });

            const data: any = Usuario.build(objUsuario);
            await data.save();
            await BitacoraController.getInstance().crearBitacora('CREATE',
                'Usuario',
                `Usuario ID: ${data.usuarioID} creado con éxito.`,
                req?.user.id_user);
            return res.json({
                status: 200,
                msg: "Usuario creado con éxito.",
                data: [{
                    id: data.usuarioID,
                    name: data.nombre,
                    lastname: data.apellido,
                    email: data.correo,
                    phone: data.telefono,
                    photo: data.fotografia,
                    gender: data.genero,
                    birth_date: data.fechaNacimiento,
                    signup_date: data.fechaHoraClaveAcceso,
                    address: data.direccion,
                    id_country: data.paisID,
                    id_status: data.estado,
                    id_rol: data.rol,
                    age: this.getAge(data.fechaNacimiento)
                }]
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                msg: "Error al guardar el usuario.",
                data: [error],  
            })
        }
    }

    /**
     * ACTUALIZAR USUARIO
     */
    update = async (req: any, res: Response) => {
        const { body } = req;

        let objUsuario: any = {
            id: body?.id,
            nombre: body?.name,
            apellido: body?.lastname,
            correo: body?.email,
            telefono: body?.phone,
            genero: body?.gender,
            fechaNacimiento: body?.birth_date,
            direccion: body?.address,
            paisID: body?.id_country
        }

        try {
            const data: any = await Usuario.findByPk(objUsuario.id);

            if (data) {

                body.photo = body.photo != undefined ? body.photo : '';
                if (body.photo != '') {
                    let url: any;

                    let extension = this.extension(body.photo)
                    let base64 = body.photo.replace(`data:image/${this.extensionRemove(body.photo)};base64,`, '')

                    await UploadFile(base64, extension).then((data) => url = data);

                    if (url == null) {
                        return res.status(400).json({
                            status: 400,
                            data: []
                        })
                    }

                    //INCRUSTAR IMAGEN
                    objUsuario.fotografia = 'https://grupof.s3.us-east-2.amazonaws.com/' + url.Key;
                }

                body.password = body.password != undefined ? body.password : '';
                if (body.password != '') {
                    //INCRUSTAR CONTRASEÑA
                    const keyCrypto = CryptoJS.enc.Hex.parse(String(process.env.CRYPTO_KEY));
                    const iv = CryptoJS.enc.Hex.parse(String(process.env.CRYPTO_IV));
                    objUsuario.claveAcceso = CryptoJS.AES.encrypt(objUsuario.claveAcceso, keyCrypto, { iv }).toString();
                }

                await data.update(objUsuario);
                await BitacoraController.getInstance().crearBitacora('UPDATE',
                    'Usuario',
                    `Usuario ID: ${objUsuario.id} actualizado con éxito.`,
                    req?.user.id_user);
                return res.json({
                    status: 200,
                    msg: "Usuario actualizado con éxito.",
                    data: [{
                        id: data.usuarioID,
                        name: data.nombre,
                        lastname: data.apellido,
                        email: data.correo,
                        phone: data.telefono,
                        photo: data.fotografia,
                        gender: data.genero,
                        birth_date: data.fechaNacimiento,
                        signup_date: data.fechaHoraClaveAcceso,
                        address: data.direccion,
                        id_country: data.paisID,
                        id_status: data.estado,
                        id_rol: data.rol,
                        age: this.getAge(data.fechaNacimiento)
                    }]
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    msg: "Error al actualizar director técnico.",
                    data: []
                })
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                msg: "Error al actualizar director técnico.",
                data: []
            })
        }
    }

    /**
     * ACTUALIZAR ESTADO DE MODELO
     */
    changeState = async (req: any, res: Response) => {
        const { body } = req;

        try {
            const data: any = await Usuario.findByPk(body.id);

            if (data) {
                await data.update({
                    estado: body.id_status,
                });
                await BitacoraController.getInstance().crearBitacora('UPDATE',
                    'Usuario',
                    `Usuario ID: ${body.id} ${body.description}.`,
                    req?.user.id_user);
                return res.json({
                    status: 200,
                    msg: "Estado del usuario actualizado con éxito.",
                    data: [{
                        id: data.usuarioID,
                        name: data.nombre,
                        lastname: data.apellido,
                        email: data.correo,
                        phone: data.telefono,
                        photo: data.fotografia,
                        gender: data.genero,
                        birth_date: data.fechaNacimiento,
                        signup_date: data.fechaHoraClaveAcceso,
                        address: data.direccion,
                        id_country: data.paisID,
                        id_status: data.estado,
                        id_rol: data.rol,
                        age: this.getAge(data.fechaNacimiento)
                    }]
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    msg: "Error al actualizar el estado del usuario.",
                    data: []
                })
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                msg: "Error al actualizar el estado del usuario.",
                data: []
            })
        }
    }

    extension = (base64: string) => {
        if (base64.includes('image/jpeg')) {
            return 'jpg'
        } else if (base64.includes('image/png')) {
            return 'png'
        }
    }

    extensionRemove = (base64: string) => {
        if (base64.includes('image/jpeg')) {
            return 'jpeg'
        } else if (base64.includes('image/png')) {
            return 'png'
        }
    }

    getAge = (dateString: string) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}