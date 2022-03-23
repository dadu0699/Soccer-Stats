const app = require("../src/index");
const request = require("supertest");

describe('POST /stadium', () => {
    test('Should respond with an message', async () => {
        const response = await request(app).post('/stadium')
            .set('Authorization', process.env.TOKEN_ADMINISTRADOR)
            .send();
        expect(response.body.msg).toBeDefined();
    });

    test('Should respond with a 500 status code', async () => {
        const response = await request(app).post('/stadium')
            .set('Authorization', process.env.TOKEN_ADMINISTRADOR)
            .send();
        expect(response.statusCode).toBe(500);
    });
});

describe('PUT /stadium', () => {
    test('Should respond with an Array', async () => {
        const response = await request(app).put('/stadium')
            .set('Authorization', process.env.TOKEN_ADMINISTRADOR)
            .send();
        expect(response.body.data).toBeInstanceOf(Array);
    });

    test('Should respond with a 500 status code', async () => {
        const response = await request(app).put('/stadium')
            .set('Authorization', process.env.TOKEN_ADMINISTRADOR)
            .send();
        expect(response.statusCode).toBe(500);
    });
});

describe('DELETE /stadium', () => {
    test('Should respond with an Array', async () => {
        const response = await request(app).delete('/stadium')
            .set('Authorization', process.env.TOKEN_ADMINISTRADOR)
            .send({id:999});
        expect(response.body.data).toBeInstanceOf(Array);
    });

    test('Should respond with a 200 status code', async () => {
        const response = await request(app).delete('/stadium')
            .set('Authorization', process.env.TOKEN_ADMINISTRADOR)
            .send({id:999});
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /stadium/:id', () => {
    test('Should respond with a 200 status code', async () => {
        const response = await request(app).get('/stadium/99')
            .set('Authorization', process.env.TOKEN_ADMINISTRADOR)
            .send();
        expect(response.statusCode).toBe(200);
    });

    test('Should respond with an array', async () => {
        const response = await request(app).get('/stadium/99')
            .set('Authorization', process.env.TOKEN_ADMINISTRADOR)
            .send();
        expect(response.body.data).toBeInstanceOf(Array);
    });
});

describe('GET /stadium', () => {
    test('Should respond with a 200 status code', async () => {
        const response = await request(app).get('/stadium')
            .set('Authorization', process.env.TOKEN_ADMINISTRADOR)
            .send();
        expect(response.statusCode).toBe(200);
    });

    test('Should respond with an array', async () => {
        const response = await request(app).get('/stadium')
            .set('Authorization', process.env.TOKEN_ADMINISTRADOR)
            .send();
        expect(response.body.data).toBeInstanceOf(Array);
    });
});