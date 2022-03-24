require('mysql2/node_modules/iconv-lite').encodingExists('foo');
import request from "supertest";
import Server from "../server/server";
const server = new Server(6011);
const NODE_ENV = process.env.NODE_ENV || 'development'
require('dotenv').config({
    path: ".env." + NODE_ENV
})
describe('APIs Test Administrator', () => {

    let headers = {
        'authorization': `Bearer ${process.env.TOKEN_ADMINISTRADOR}`,
        'Accept': 'application/json'
    }

    test('GET ALL Users - Obtener todos los usuarios', async () => {
        await server.listen();
        const res = await request(server.app)
            .get('/api/user')
            .set(headers);
        // COMPARAR ESTADO 200
        expect(res.statusCode).toEqual(200);
    });

});

describe('APIs Test Reportes', () => {

    let headers = {
        'authorization': `Bearer ${process.env.TOKEN_ADMINISTRADOR}`,
        'Accept': 'application/json'
    }

    test('GET ALL Reporte 1 - Obtener reporte 1 sin parametro.', async () => {
        const expected = {
            status: 400,
            msg: "Error al obtener usuarios suscritos al equipo x.",
            data: []
        }

        const res = await request(server.app)
            .get('/api/report/1')
            .set(headers);

        // COMPARAR RESPONSE
        expect(res.body).toEqual(expected);
    });
});
