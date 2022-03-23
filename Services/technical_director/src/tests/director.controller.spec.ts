require('mysql2/node_modules/iconv-lite').encodingExists('foo');
import request from "supertest";
import Server from "../server/server";
const server = new Server(6005);
const NODE_ENV = process.env.NODE_ENV || 'development'
require('dotenv').config({
    path: ".env." + NODE_ENV
})
describe('APIs Test Technical Director', () => {

    let headers = {
        'authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpZF9yb2wiOjF9.TO1PkVlWFbrGJbUIJvagkTF_jCUIelGrs9-NID5PySs'
    }

    test('GET ALL Technical Director - Obtener todos los directores', async () => {
        await server.listen();
        const res = await request(server.app)
            .get('/api/technical-director')
            .set(headers);
        // COMPARAR ESTADO 200
        expect(res.statusCode).toEqual(200);
    });

    test('GET SINGLE Technical Director - Obtener director inexistente.', async () => {
        const res = await request(server.app).get('/api/technical-director?id=9999999999')
            .set(headers);

        const expected = {
            status: 400,
            msg: "Error al obtener director(es) técnico(s).",
            data: []
        }
        // COMPARAR RESPONSE
        expect(res.body).toEqual(expected);
    });

});
