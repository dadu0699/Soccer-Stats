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
                SELECT *, pais.nombre AS pais FROM usuario
                INNER JOIN pais ON pais.paisID = usuario.paisID
                wHERE usuarioID NOT IN (SELECT usuarioID FROM membresia);
            `;

            const data = await db.query(query, {
                type: QueryTypes.SELECT
            })

            let reporte = data.map((res: any) => {
                return {
                    id: res.id,
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
                SELECT *, pais.nombre AS pais FROM usuario
                INNER JOIN pais ON pais.paisID = usuario.paisID
                wHERE usuarioID IN (SELECT usuarioID FROM membresia);
            `;

            const data = await db.query(query, {
                type: QueryTypes.SELECT
            })

            let reporte = data.map((res: any) => {
                return {
                    id: res.id,
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

}