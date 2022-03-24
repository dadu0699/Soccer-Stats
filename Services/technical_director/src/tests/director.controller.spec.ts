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
        'authorization': `Bearer ${process.env.TOKEN_ADMINISTRADOR}`,
        'Accept': 'application/json'
    }

    test('GET ALL Technical Director - Obtener todos los directores', async () => {
        await server.listen();
        const res = await request(server.app)
            .get('/technical-director')
            .set(headers);
        // COMPARAR ESTADO 200
        expect(res.statusCode).toEqual(200);
    });

    test('GET SINGLE Technical Director - Obtener director inexistente.', async () => {
        const res = await request(server.app).get('/technical-director?id=9999999999')
            .set(headers);

        const expected = {
            status: 400,
            msg: "Error al obtener director(es) técnico(s).",
            data: []
        }
        // COMPARAR RESPONSE
        expect(res.body).toEqual(expected);
    });

    test('UPDATED Technical Director - Actualización director inexistente.', async () => {
        const expected = {
            status: 400,
            msg: "Error al actualizar director técnico.",
            data: []
        };
        const res = await request(server.app).put('/technical-director')
            .send({
                id: 999999999,
                name: 'Jose',
                lastname: 'Morente',
                birth_date: '1998-10-03',
                status: 1,
                photo: '',
                id_country: 1
            })
            .set(headers);
        // COMPARAR RESPONSE
        expect(res.body).toEqual(expected);
    });

    test('DELETE Technical Director - Eliminar director inexistente.', async () => {
        const expected = {
            status: 400,
            msg: "Error al eliminar director técnico.",
            data: []
        };
        const res = await request(server.app)
            .delete('/technical-director')
            .send({
                id: 999999999
            })
            .set(headers);
        // COMPARAR RESPONSE
        expect(res.body).toEqual(expected);
    });

});
