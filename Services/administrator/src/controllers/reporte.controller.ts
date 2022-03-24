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


}