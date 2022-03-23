const app = require("../src/index");
const request = require("supertest");

describe('POST /esb/team', () => {
    test('Should respond with an message', async () => {
        const response = await request(app).post('/esb/team')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpZF9yb2wiOjF9.TO1PkVlWFbrGJbUIJvagkTF_jCUIelGrs9-NID5PySs')
            .send();
        expect(response.body.msj).toBeDefined();
    });

    test('Should respond with a 500 status code', async () => {
        const response = await request(app).post('/esb/team')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpZF9yb2wiOjF9.TO1PkVlWFbrGJbUIJvagkTF_jCUIelGrs9-NID5PySs')
            .send();
        expect(response.statusCode).toBe(500);
    });
});

describe('PUT /esb/team', () => {
    test('Should respond with an Array', async () => {
        const response = await request(app).put('/esb/team')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpZF9yb2wiOjF9.TO1PkVlWFbrGJbUIJvagkTF_jCUIelGrs9-NID5PySs')
            .send();
        expect(response.body.data).toBeInstanceOf(Array);
    });

    test('Should respond with a 500 status code', async () => {
        const response = await request(app).put('/esb/team')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpZF9yb2wiOjF9.TO1PkVlWFbrGJbUIJvagkTF_jCUIelGrs9-NID5PySs')
            .send();
        expect(response.statusCode).toBe(500);
    });
});

describe('DELETE /esb/team', () => {
    test('Should respond with an Array', async () => {
        const response = await request(app).delete('/esb/team')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpZF9yb2wiOjF9.TO1PkVlWFbrGJbUIJvagkTF_jCUIelGrs9-NID5PySs')
            .send({id:999});
        expect(response.body.data).toBeInstanceOf(Array);
    });

    test('Should respond with a 200 status code', async () => {
        const response = await request(app).delete('/esb/team')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpZF9yb2wiOjF9.TO1PkVlWFbrGJbUIJvagkTF_jCUIelGrs9-NID5PySs')
            .send({id:999});
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /esb/team/:id', () => {
    test('Should respond with a 200 status code', async () => {
        const response = await request(app).get('/esb/team/99')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpZF9yb2wiOjF9.TO1PkVlWFbrGJbUIJvagkTF_jCUIelGrs9-NID5PySs')
            .send();
        expect(response.statusCode).toBe(200);
    });

    test('Should respond with an array', async () => {
        const response = await request(app).get('/esb/team/99')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpZF9yb2wiOjF9.TO1PkVlWFbrGJbUIJvagkTF_jCUIelGrs9-NID5PySs')
            .send();
        expect(response.body.data).toBeInstanceOf(Array);
    });
});

describe('GET /esb/team', () => {
    test('Should respond with a 200 status code', async () => {
        const response = await request(app).get('/esb/team')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpZF9yb2wiOjF9.TO1PkVlWFbrGJbUIJvagkTF_jCUIelGrs9-NID5PySs')
            .send();
        expect(response.statusCode).toBe(200);
    });

    test('Should respond with an array', async () => {
        const response = await request(app).get('/esb/team')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpZF9yb2wiOjF9.TO1PkVlWFbrGJbUIJvagkTF_jCUIelGrs9-NID5PySs')
            .send();
        expect(response.body.data).toBeInstanceOf(Array);
    });
});