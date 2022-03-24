const app = require("../src/index");
const request = require("supertest");

describe('POST /competition', () => {
    test('Should respond with an message', async () => {
        const response = await request(app).post('/competition')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.body.msg).toBeDefined();
    });

    test('Should respond with a 400 status code', async () => {
        const response = await request(app).post('/competition')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.statusCode).toBe(400);
    });
});

describe('PUT /competition', () => {
    test('Should respond with an Array', async () => {
        const response = await request(app).put('/competition')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send({
                id: 999,
                name: "Edicion especial new",
                type: 2,
                year : 2021,
                id_champion_team: 1,
                id_country: 10
            });
        expect(response.body.data).toBeInstanceOf(Array);
    });

    test('Should respond with a 200 status code', async () => {
        const response = await request(app).put('/competition')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send({
                id: 999,
                name: "Edicion especial new",
                type: 2,
                year : 2021,
                id_champion_team: 1,
                id_country: 10
            });
        expect(response.statusCode).toBe(200);
    });
});

describe('DELETE /competition', () => {
    test('Should respond with an Array', async () => {
        const response = await request(app).delete('/competition')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send({id:999});
        expect(response.body.data).toBeInstanceOf(Array);
    });

    test('Should respond with a 200 status code', async () => {
        const response = await request(app).delete('/competition')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send({id:999});
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /competition?id=number', () => {
    test('Should respond with a 200 status code', async () => {
        const response = await request(app).get('/competition/?id=99')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.statusCode).toBe(200);
    });

    test('Should respond with an array', async () => {
        const response = await request(app).get('/competition/?id=99')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.body.data).toBeInstanceOf(Array);
    });
});

describe('GET /competition', () => {
    test('Should respond with a 200 status code', async () => {
        const response = await request(app).get('/competition')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.statusCode).toBe(200);
    });

    test('Should respond with an array', async () => {
        const response = await request(app).get('/competition')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.body.data).toBeInstanceOf(Array);
    });
});