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
            .get('/user')
            .set(headers);
        // COMPARAR ESTADO 200
        expect(res.statusCode).toEqual(200);
    });

    test('GET SINGLE Usuario - Obtener usuario inexistente.', async () => {
        const res = await request(server.app).get('/user?id=9999999999')
            .set(headers);

        const expected = {
            status: 400,
            msg: "Error al obtener usuario(s).",
            data: []
        }
        // COMPARAR RESPONSE
        expect(res.body).toEqual(expected);
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
            .get('/report/1')
            .set(headers);

        // COMPARAR RESPONSE
        expect(res.body).toEqual(expected);
    });

    test('GET ALL Reporte 2 - Obtener reporte 2 sin parametro.', async () => {
        const expected = {
            status: 400,
            msg: "Error al obtener usuarios con o sin membresía.",
            data: []
        }

        const res = await request(server.app)
            .get('/report/2')
            .set(headers);

        // COMPARAR RESPONSE
        expect(res.body).toEqual(expected);
    });

    test('GET ALL Reporte 5 - Obtener error', async () => {
        const res = await request(server.app)
            .get('/report/5')
            .set(headers);
        // COMPARAR ESTADO 400
        expect(res.statusCode).toEqual(400);
    });

    test('GET ALL Reporte 6 - Obtener error', async () => {
        const res = await request(server.app)
            .get('/report/6')
            .set(headers);
        // COMPARAR ESTADO 400
        expect(res.statusCode).toEqual(400);
    });

    test('GET ALL Reporte 7 - Obtener error', async () => {
        const res = await request(server.app)
            .get('/report/7')
            .set(headers);
        // COMPARAR ESTADO 400
        expect(res.statusCode).toEqual(400);
    });

    test('GET ALL Reporte 8 - Obtener error', async () => {
        const res = await request(server.app)
            .get('/report/8')
            .set(headers);
        // COMPARAR ESTADO 400
        expect(res.statusCode).toEqual(400);
    });

    test('GET ALL Reporte 9 - Obtener error', async () => {
        const res = await request(server.app)
            .get('/report/9')
            .set(headers);
        // COMPARAR ESTADO 400
        expect(res.statusCode).toEqual(400);
    });

});
