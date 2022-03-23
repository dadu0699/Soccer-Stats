import Bitacora from '../models/bitacora.model';

export default class BitacoraController {
    private static _instance: BitacoraController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    public async crearBitacora(accion: string, tabla: string, registro: string, usuarioID: number) {
        const data: any = Bitacora.build({
            accion: accion,
            nombreTabla: tabla,
            registro: registro,
            usuarioID: usuarioID,
        });
        await data.save();
    }

}