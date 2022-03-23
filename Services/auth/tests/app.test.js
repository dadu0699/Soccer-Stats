const supertest = require('supertest');

const { app, server } = require('../app');

const api = supertest(app);

describe('Solicitud de password temporal', () => {
  test('Debería enviar un correo con el código', async () => {
    await api
      .post('/auth/temporal-password')
      .send({
        email: process.env.MAIL,
      })
      .expect(200);
  });
});

afterAll(() => {
  server.close();
});
