import { Request, Response } from 'express';
import CryptoJS = require("crypto-js");
import UploadFile from '../utils/aws-s3.util';
import DirectorTecnico from '../models/director-tecnico.model';
import BitacoraController from './bitacora.controller';

export default class DirectorTecnicoController {
    private static _instance: DirectorTecnicoController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * LISTAR DIRECTORES TECNICOS
     */
    getAll = async (req: Request, res: Response) => {
        const { id } = req.query;

        if (id == null) {
            const data = await DirectorTecnico.findAll({
                include: ['pais']
            });

            let directores = data.map((director: any) => {
                return {
                    id: director.directorTecnicoID,
                    name: director.nombre,
                    lastname: director.apellido,
                    birth_date: director.fechaNacimiento,
                    status: director.estado,
                    id_country: director.paisID,
                    country: director.pais.nombre,
                    photo: director.foto,
                }
            });

            return res.json({
                status: 200,
                msg: "Director(es) técnico(s) obtenido(s) con éxito.",
                data: directores
            });
        } else {
            const data: any = await DirectorTecnico.findByPk(Number(id), {
                include: ['pais']
            });
            if (data) {
                return res.json({
                    status: 200,
                    msg: "Director(es) técnico(s) obtenido(s) con éxito.",
                    data: [{
                        id: data.directorTecnicoID,
                        name: data.nombre,
                        lastname: data.apellido,
                        birth_date: data.fechaNacimiento,
                        status: data.estado,
                        id_country: data.paisID,
                        country: data.pais.nombre,
                        photo: data.foto,
                    }]
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    msg: "Error al obtener director(es) técnico(s).",
                    data: []
                })
            }
        }
    }


    /**
     * ACTUALIZAR DIRECTOR TECNICO
     */
    update = async (req: any, res: Response) => {
        const { body } = req;

        let objUsuario: any = {
            id: body?.id,
            nombre: body?.name,
            apellido: body?.lastname,
            fechaNacimiento: body?.birth_date,
            estado: body?.status,
            paisID: body?.id_country,
        }

        try {
            const data: any = await DirectorTecnico.findByPk(objUsuario.id);

            if (data) {

                body.photo = body.photo ? body.photo : '';
                if (body.photo != '') {
                    let url: any;

                    let extension = this.extension(body.photo)
                    let base64 = body.photo.replace(`data:image/${this.extensionRemove(body.photo)};base64,`, '')

                    await UploadFile(base64, extension).then((data) => url = data);

                    if (url == null) {
                        return res.status(400).json({
                            status: 400
                        })
                    }

                    //INCRUSTAR IMAGEN
                    objUsuario.foto = 'https://grupof.s3.us-east-2.amazonaws.com/' + url.Key;
                }

                await data.update(objUsuario);
                await BitacoraController.getInstance().crearBitacora('CREATE',
                    'DirectorTecnico',
                    `Director técnico ID: ${objUsuario.id} actualizado con éxito.`,
                    req?.user.id_user);
                return res.json({
                    status: 200,
                    msg: "Director técnico actualizado con éxito.",
                    data: [{
                        id: data.directorTecnicoID,
                        name: data.nombre,
                        lastname: data.apellido,
                        birth_date: data.fechaNacimiento,
                        status: data.estado,
                        id_country: data.paisID,
                        photo: data.foto,
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
     * CREAR DIRECTOR TECNICO
     */
    create = async (req: any, res: Response) => {
        const { body } = req;

        let objUsuario = {
            nombre: body.name,
            apellido: body.lastname,
            fechaNacimiento: body.birth_date,
            foto: '',
            estado: body.status,
            paisID: body.id_country,
        }

        try {
            let url: any;

            let extension = this.extension(body.photo)
            let base64 = body.photo.replace(`data:image/${this.extensionRemove(body.photo)};base64,`, '')

            await UploadFile(base64, extension).then((data) => url = data);

            if (url == null) {
                return res.status(400).json({
                    status: 400
                })
            }

            //INCRUSTAR IMAGEN
            objUsuario.foto = 'https://grupof.s3.us-east-2.amazonaws.com/' + url.Key;

            const data: any = DirectorTecnico.build(objUsuario);
            await data.save();
            await BitacoraController.getInstance().crearBitacora('CREATE',
                'DirectorTecnico',
                `Director técnico ID: ${data.directorTecnicoID} creado con éxito.`,
                req?.user.id_user);
            return res.json({
                status: 200,
                msg: "Directo técnico creado con éxito.",
                data: [{
                    id: data.directorTecnicoID,
                    name: data.nombre,
                    lastname: data.apellido,
                    birth_date: data.fechaNacimiento,
                    status: data.estado,
                    id_country: data.paisID,
                    photo: data.foto,
                }]
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                msg: "Error al crear directo técnico.",
                data: []
            })
        }
    }

    /**
     * ELIMINAR DIRECTOR TECNICO
     */
    delete = async (req: any, res: Response) => {
        try {
            const { id } = req.body;

            const data: any = await DirectorTecnico.findByPk(id);
            if (data) {
                await data.destroy();
                await BitacoraController.getInstance().crearBitacora('CREATE',
                    'DirectorTecnico',
                    `Director técnico ID: ${data.directorTecnicoID} eliminado con éxito.`,
                    req?.user.id_user);
                return res.json({
                    status: 200,
                    msg: "Director técnico eliminado con éxito.",
                    data: [{
                        id: data.directorTecnicoID,
                        name: data.nombre,
                        lastname: data.apellido,
                        birth_date: data.fechaNacimiento,
                        status: data.estado,
                        id_country: data.paisID,
                        photo: data.foto,
                    }]
                });

            } else {
                return res.status(400).json({
                    status: 400,
                    msg: "Error al eliminar director técnico.",
                    data: []
                })
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                msg: "Error al eliminar director técnico.",
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