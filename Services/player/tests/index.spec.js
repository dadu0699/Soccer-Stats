const app = require("../src/index");
const request = require("supertest");

describe('POST /player', () => {
    test('Should respond with an message', async () => {
        const response = await request(app).post('/player')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.body.msg).toBeDefined();
    });

    test('Should respond with a 400 status code', async () => {
        const response = await request(app).post('/player')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.statusCode).toBe(400);
    });
});

describe('PUT /player', () => {
    test('Should respond with an Array', async () => {
        const response = await request(app).put('/player')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.body.data).toBeInstanceOf(Array);
    });

    test('Should respond with a 200 status code', async () => {
        const response = await request(app).put('/player')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send({
                id: 999,
                name: "Moyo",
                lastname: "Contreras",
                birth_date : "1986-05-03",
                nationality: 89,
                position: 4,
                status: 1,
                photo: ""
            });
        expect(response.statusCode).toBe(200);
    });
});

describe('DELETE /player', () => {
    test('Should respond with an Array', async () => {
        const response = await request(app).delete('/player')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send({id:999});
        expect(response.body.data).toBeInstanceOf(Array);
    });

    test('Should respond with a 200 status code', async () => {
        const response = await request(app).delete('/player')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send({id:999});
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /player/?id=number', () => {
    test('Should respond with a 200 status code', async () => {
        const response = await request(app).get('/player/?id=99')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.statusCode).toBe(200);
    });

    test('Should respond with an array', async () => {
        const response = await request(app).get('/player/?id=99')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.body.data).toBeInstanceOf(Array);
    });
});

describe('GET /player', () => {
    test('Should respond with a 200 status code', async () => {
        const response = await request(app).get('/player')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.statusCode).toBe(200);
    });

    test('Should respond with an array', async () => {
        const response = await request(app).get('/player')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.body.data).toBeInstanceOf(Array);
    });
});