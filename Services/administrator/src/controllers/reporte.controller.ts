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
            SELECT Usuario.nombre, Usuario.apellido, Usuario.correo, Usuario.fotografia, 
                Pais.nombre AS pais FROM Favorito
            INNER JOIN Usuario ON Usuario.usuarioID = Favorito.usuarioID
            INNER JOIN Pais ON Pais.paisID = Usuario.paisID
            WHERE Favorito.equipoID = :id_team;
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
            SELECT * FROM usuariosMembresia
            WHERE rol = 3 AND has_membership = 0;
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
            SELECT * FROM usuariosMembresia
            WHERE rol = 3 AND has_membership = 1;
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
            SELECT Usuario.usuarioID, Usuario.nombre, Usuario.apellido, Usuario.correo,
            Usuario.fotografia, Pais.nombre AS pais, COUNT(*) count FROM Membresia
            INNER JOIN Usuario ON Usuario.usuarioID = Membresia.usuarioID
            INNER JOIN Pais ON Pais.paisID = Usuario.paisID
            GROUP BY Usuario.usuarioID
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
            SELECT Usuario.usuarioID, Usuario.nombre, Usuario.apellido, Usuario.correo,
            Usuario.fotografia, Pais.nombre AS pais, (COUNT(*) * 15) amount FROM Membresia
            INNER JOIN Usuario ON Usuario.usuarioID = Membresia.usuarioID
            INNER JOIN Pais ON Pais.paisID = Usuario.paisID
            GROUP BY Usuario.usuarioID
            ORDER BY amount DESC
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
                amount: res.amount,
            }
        })

        res.json({
            status: 200,
            msg: "Usuarios que más dinero han gastado obtenidos con éxito.",
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
            SELECT Usuario.usuarioID, Usuario.nombre, Usuario.apellido, 
            Usuario.correo, Usuario.fotografia, Pais.nombre AS pais FROM Usuario
            INNER JOIN Pais ON Pais.paisID = Usuario.paisID
            WHERE Usuario.paisID = :id_country;
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
            SELECT Usuario.usuarioID, Usuario.nombre, Usuario.apellido, 
            Usuario.correo, Usuario.fotografia, Pais.nombre AS pais FROM Usuario
            INNER JOIN Pais ON Pais.paisID = Usuario.paisID
            WHERE Usuario.genero = :gender;
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
            SELECT Usuario.usuarioID, Usuario.nombre, Usuario.apellido, 
            Usuario.correo, Usuario.fotografia, Pais.nombre AS pais,
            floor(datediff (now(), Usuario.fechaNacimiento)/365) AS age
            FROM Usuario
            INNER JOIN Pais ON Pais.paisID = Usuario.paisID
            WHERE floor(datediff (now(), Usuario.fechaNacimiento)/365) >= :age;
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
            SELECT Usuario.usuarioID, Usuario.nombre, Usuario.apellido, Usuario.correo,
            Usuario.fotografia, Pais.nombre AS pais, COUNT(*) count FROM Noticia
            INNER JOIN Usuario ON Usuario.usuarioID = Noticia.usuarioID
            INNER JOIN Pais ON Pais.paisID = Usuario.paisID
            GROUP BY Usuario.usuarioID
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
            SELECT Usuario.usuarioID, Usuario.nombre, Usuario.apellido, Usuario.correo,
            Usuario.fotografia, Pais.nombre AS pais, COUNT(*) count FROM Noticia
            INNER JOIN Usuario ON Usuario.usuarioID = Noticia.usuarioID
            INNER JOIN Pais ON Pais.paisID = Usuario.paisID
            WHERE Noticia.equipoID = :id_team
            GROUP BY Usuario.usuarioID
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
            SELECT Bitacora.bitacoraID, Usuario.nombre, Usuario.apellido, Usuario.correo,
            Usuario.fotografia, accion, nombreTabla, registro, fecha, Usuario.rol  FROM Bitacora
            INNER JOIN Usuario ON Usuario.usuarioID = Bitacora.usuarioID
            ORDER BY fecha DESC;
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