const app = require("../src/index");
const request = require("supertest");

describe('POST /team', () => {
    test('Should respond with an message', async () => {
        const response = await request(app).post('/team')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.body.msg).toBeDefined();
    });

    test('Should respond with a 500 status code', async () => {
        const response = await request(app).post('/team')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.statusCode).toBe(500);
    });
});

describe('PUT /team', () => {
    test('Should respond with an Array', async () => {
        const response = await request(app).put('/team')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.body.data).toBeInstanceOf(Array);
    });

    test('Should respond with a 500 status code', async () => {
        const response = await request(app).put('/team')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.statusCode).toBe(500);
    });
});

describe('DELETE /team', () => {
    test('Should respond with an Array', async () => {
        const response = await request(app).delete('/team')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send({id:999});
        expect(response.body.data).toBeInstanceOf(Array);
    });

    test('Should respond with a 200 status code', async () => {
        const response = await request(app).delete('/team')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send({id:999});
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /team/:id', () => {
    test('Should respond with a 200 status code', async () => {
        const response = await request(app).get('/team/99')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.statusCode).toBe(200);
    });

    test('Should respond with an array', async () => {
        const response = await request(app).get('/team/99')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.body.data).toBeInstanceOf(Array);
    });
});

describe('GET /team', () => {
    test('Should respond with a 200 status code', async () => {
        const response = await request(app).get('/team')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.statusCode).toBe(200);
    });

    test('Should respond with an array', async () => {
        const response = await request(app).get('/team')
            .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
            .send();
        expect(response.body.data).toBeInstanceOf(Array);
    });
});