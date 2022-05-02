const app = require("../src/index");
const request = require("supertest");

describe('POST /predic', () => {
    test('Should respond with an message', async () => {
        const response = await request(app).post('/prediction/predic')
            .send();
        expect(response.body.msg).toBeDefined();
    });

    test('Should respond with a status code', async () => {
        const response = await request(app).post('/prediction/predic')
            .send();
        expect(response.body.status).toBeDefined();
    });
});