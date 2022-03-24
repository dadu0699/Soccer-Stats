import { Request, Response } from 'express';
import db from "../db/connection";
import { QueryTypes } from 'sequelize';

export default class ReporteController {
    private static _instance: ReporteController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * OBTENER ESTADISTICA DE CURSOS REALIZADOS
     */
    reporte1 = async (req: Request, res: Response) => {
        const { id_team } = req.query;

        if (!id_team) {
            return res.status(400).json({
                status: 400,
                msg: "Error al obtener usuarios suscritos al equipo x.",
                data: []
            });
        }

        let query = `
            SELECT usuario.nombre, usuario.apellido, usuario.correo, usuario.fotografia, pais.nombre AS pais FROM favorito
            INNER JOIN usuario ON usuario.usuarioID = favorito.usuarioID
            INNER JOIN pais ON pais.paisID = usuario.paisID
            WHERE favorito.equipoID = :id_team;
        `;

        const data = await db.query(query, {
            replacements: {
                id_team: id_team
            },
            type: QueryTypes.SELECT
        })

        let reporte = data.map((res: any) => {
            return {
                name: res.nombre,
                lastname: res.apellido,
                email: res.correo,
                photo: res.fotografia,
                nationality: res.pais,
            }
        })

        res.json({
            status: 200,
            msg: "Usuarios suscritos al equipo x obtenidos con éxito.",
            data: reporte
        });
    }

    /**
     * OBTENER USUARIOS CON MEMBRESIA Y SIN MEMBRESIA
     */
    reporte2 = async (req: Request, res: Response) => {
        const { membership } = req.query;

        if (membership == '0') {
            let query = `
                SELECT usuario.usuarioID, usuario.nombre, usuario.apellido, usuario.correo,
                usuario.fotografia, pais.nombre AS pais FROM usuario
                INNER JOIN pais ON pais.paisID = usuario.paisID
                wHERE usuarioID NOT IN (SELECT usuarioID FROM membresia);
            `;

            const data = await db.query(query, {
                type: QueryTypes.SELECT
            })

            let reporte = data.map((res: any) => {
                return {
                    id: res.usuarioID,
                    name: res.nombre,
                    lastname: res.apellido,
                    email: res.correo,
                    photo: res.fotografia,
                    nationality: res.pais,
                }
            })

            return res.json({
                status: 200,
                msg: "Usuarios con o sin membresía obtenidos con éxito.",
                data: reporte
            });
        } else if (membership == '1') {
            let query = `
                SELECT usuario.usuarioID, usuario.nombre, usuario.apellido, usuario.correo,
                usuario.fotografia, pais.nombre AS pais FROM usuario
                INNER JOIN pais ON pais.paisID = usuario.paisID
                wHERE usuarioID IN (SELECT usuarioID FROM membresia);
            `;

            const data = await db.query(query, {
                type: QueryTypes.SELECT
            })

            let reporte = data.map((res: any) => {
                return {
                    id: res.usuarioID,
                    name: res.nombre,
                    lastname: res.apellido,
                    email: res.correo,
                    photo: res.fotografia,
                    nationality: res.pais,
                }
            })

            return res.json({
                status: 200,
                msg: "Usuarios con o sin membresía obtenidos con éxito.",
                data: reporte
            });
        } else {
            return res.status(400).json({
                status: 400,
                msg: "Error al obtener usuarios con o sin membresía.",
                data: []
            });
        }
    }

    /**
     * OBTENER TOP 10 Usuarios con mas membresia
     */
    reporte3 = async (req: Request, res: Response) => {
        let query = `
            SELECT usuario.usuarioID, usuario.nombre, usuario.apellido, usuario.correo,
            usuario.fotografia, pais.nombre AS pais, COUNT(*) count FROM membresia
            INNER JOIN usuario ON usuario.usuarioID = membresia.usuarioID
            INNER JOIN pais ON pais.paisID = usuario.paisID
            GROUP BY usuario.usuarioID
            ORDER BY count DESC
            LIMIT 10;
        `;

        const data = await db.query(query, {
            type: QueryTypes.SELECT
        })

        let reporte = data.map((res: any) => {
            return {
                id: res.usuarioID,
                name: res.nombre,
                lastname: res.apellido,
                email: res.correo,
                photo: res.fotografia,
                nationality: res.pais,
                count: res.count,
            }
        })

        res.json({
            status: 200,
            msg: "Usuarios con mas membresías obtenidos con éxito.",
            data: reporte
        });
    }

    /**
     * OBTENER TOP 10 Usuarios con mas membresia
     */
    reporte4 = async (req: Request, res: Response) => {
        let query = `
            SELECT usuario.usuarioID, usuario.nombre, usuario.apellido, usuario.correo,
            usuario.fotografia, pais.nombre AS pais, (COUNT(*) * 15) mount FROM membresia
            INNER JOIN usuario ON usuario.usuarioID = membresia.usuarioID
            INNER JOIN pais ON pais.paisID = usuario.paisID
            GROUP BY usuario.usuarioID
            ORDER BY mount DESC
            LIMIT 10;
        `;

        const data = await db.query(query, {
            type: QueryTypes.SELECT
        })

        let reporte = data.map((res: any) => {
            return {
                id: res.usuarioID,
                name: res.nombre,
                lastname: res.apellido,
                email: res.correo,
                photo: res.fotografia,
                nationality: res.pais,
                mount: res.mount,
            }
        })

        res.json({
            status: 200,
            msg: "Usuarios con mas membresías obtenidos con éxito.",
            data: reporte
        });
    }

    /**
     * OBTENER USUARIOS POR PAISES
     */
    reporte5 = async (req: Request, res: Response) => {
        const { id_country } = req.query;

        if (!id_country) {
            return res.status(400).json({
                status: 400,
                msg: "Error al obtener usuarios de x país.",
                data: []
            });
        }

        let query = `
            SELECT usuario.usuarioID, usuario.nombre, usuario.apellido, 
            usuario.correo, usuario.fotografia, pais.nombre AS pais FROM usuario
            INNER JOIN pais ON pais.paisID = usuario.paisID
            WHERE usuario.paisID = :id_country;
        `;

        const data = await db.query(query, {
            replacements: {
                id_country: id_country
            },
            type: QueryTypes.SELECT
        })

        let reporte = data.map((res: any) => {
            return {
                id: res.usuarioID,
                name: res.nombre,
                lastname: res.apellido,
                email: res.correo,
                photo: res.fotografia,
                nationality: res.pais,
            }
        })

        return res.json({
            status: 200,
            msg: "Usuarios suscritos al equipo x obtenidos con éxito.",
            data: reporte
        });
    }

    /**
     * OBTENER USUARIOS POR GENERO
     */
    reporte6 = async (req: Request, res: Response) => {
        const { gender } = req.query;

        if (!gender) {
            return res.status(400).json({
                status: 400,
                msg: "Error al obtener usuarios de x genero.",
                data: []
            });
        }

        let query = `
            SELECT usuario.usuarioID, usuario.nombre, usuario.apellido, 
            usuario.correo, usuario.fotografia, pais.nombre AS pais FROM usuario
            INNER JOIN pais ON pais.paisID = usuario.paisID
            WHERE usuario.genero = :gender;
        `;

        const data = await db.query(query, {
            replacements: {
                gender: gender
            },
            type: QueryTypes.SELECT
        })

        let reporte = data.map((res: any) => {
            return {
                id: res.usuarioID,
                name: res.nombre,
                lastname: res.apellido,
                email: res.correo,
                photo: res.fotografia,
                nationality: res.pais,
            }
        })

        return res.json({
            status: 200,
            msg: "Usuarios de x genero obtenidos con éxito.",
            data: reporte
        });
    }

    /**
     * OBTENER USUARIOS POR GENERO
     */
    reporte7 = async (req: Request, res: Response) => {
        const { age } = req.query;

        if (!age) {
            return res.status(400).json({
                status: 400,
                msg: "Error al obtener usuarios con al menos x años de edad.",
                data: []
            });
        }

        let query = `
            SELECT usuario.usuarioID, usuario.nombre, usuario.apellido, 
            usuario.correo, usuario.fotografia, pais.nombre AS pais,
            floor(datediff (now(), usuario.fechaNacimiento)/365) AS age
            FROM usuario
            INNER JOIN pais ON pais.paisID = usuario.paisID
            WHERE floor(datediff (now(), usuario.fechaNacimiento)/365) <= :age;
        `;

        const data = await db.query(query, {
            replacements: {
                age: age
            },
            type: QueryTypes.SELECT
        })

        let reporte = data.map((res: any) => {
            return {
                id: res.usuarioID,
                name: res.nombre,
                lastname: res.apellido,
                email: res.correo,
                photo: res.fotografia,
                nationality: res.pais,
                age: res.age,
            }
        })

        return res.json({
            status: 200,
            msg: "Usuarios con al menos x años de edad, obtenidos con éxito.",
            data: reporte
        });
    }

    /**
     * OBTENER USUARIOS POR GENERO
     */
    reporte8 = async (req: Request, res: Response) => {
        const { order } = req.query;

        if (!order) {
            return res.status(400).json({
                status: 400,
                msg: "Error al obtener empleados con mas o menos noticias publicadas.",
                data: []
            });
        }

        let query = `
            SELECT usuario.usuarioID, usuario.nombre, usuario.apellido, usuario.correo,
            usuario.fotografia, pais.nombre AS pais, COUNT(*) count FROM noticia
            INNER JOIN usuario ON usuario.usuarioID = noticia.usuarioID
            INNER JOIN pais ON pais.paisID = usuario.paisID
            GROUP BY usuario.usuarioID
        `;

        if (order == '0') {
            query += 'ORDER BY count DESC;';
        } else {
            query += 'ORDER BY count ASC;';
        }

        const data = await db.query(query, {
            type: QueryTypes.SELECT
        })

        let reporte = data.map((res: any) => {
            return {
                id: res.usuarioID,
                name: res.nombre,
                lastname: res.apellido,
                email: res.correo,
                photo: res.fotografia,
                nationality: res.pais,
                count: res.count,
            }
        })

        return res.json({
            status: 200,
            msg: "Empleados con mas o menos noticias publicadas, obtenidos con éxito.",
            data: reporte
        });
    }

    /**
     * OBTENER USUARIOS POR GENERO
     */
    reporte9 = async (req: Request, res: Response) => {
        const { order, id_team } = req.query;

        if (!order) {
            return res.status(400).json({
                status: 400,
                msg: "Error al obtener empleados con mas o menos noticias publicadas de x equipo.",
                data: []
            });
        }

        if (!id_team) {
            return res.status(400).json({
                status: 400,
                msg: "Error al obtener empleados con mas o menos noticias publicadas de x equipo.",
                data: []
            });
        }

        let query = `
            SELECT usuario.usuarioID, usuario.nombre, usuario.apellido, usuario.correo,
            usuario.fotografia, pais.nombre AS pais, COUNT(*) count FROM noticia
            INNER JOIN usuario ON usuario.usuarioID = noticia.usuarioID
            INNER JOIN pais ON pais.paisID = usuario.paisID
            WHERE noticia.equipoID = :id_team
            GROUP BY usuario.usuarioID
        `;

        if (order == '0') {
            query += 'ORDER BY count DESC;';
        } else {
            query += 'ORDER BY count ASC;';
        }

        const data = await db.query(query, {
            replacements: {
                id_team: id_team
            },
            type: QueryTypes.SELECT
        })

        let reporte = data.map((res: any) => {
            return {
                id: res.usuarioID,
                name: res.nombre,
                lastname: res.apellido,
                email: res.correo,
                photo: res.fotografia,
                nationality: res.pais,
                count: res.count,
            }
        })

        return res.json({
            status: 200,
            msg: "Empleados con mas o menos noticias publicadas de x equipo, obtenidos con éxito.",
            data: reporte
        });
    }

    /**
     * OBTENER BITACORA
     */
    reporte10 = async (req: Request, res: Response) => {
        let query = `
            SELECT bitacora.bitacoraID, usuario.nombre, usuario.apellido, usuario.correo,
            usuario.fotografia, accion, nombreTabla, registro, fecha, usuario.rol  FROM bitacora
            INNER JOIN usuario ON usuario.usuarioID = bitacora.usuarioID;
        `;

        const data = await db.query(query, {
            type: QueryTypes.SELECT
        })

        let reporte = data.map((res: any) => {
            return {
                id: res.bitacoraID,
                user_name: res.nombre,
                user_lastname: res.apellido,
                user_photo: res.fotografia,
                user_role: res.rol,
                action: res.accion,
                date: res.fecha,
                description: res.registro,
                database_table: res.nombreTabla,
            }
        })

        res.json({
            status: 200,
            msg: "Bitácora de los administradores obtenida con éxito.",
            data: reporte
        });
    }

}