const supertest = require('supertest');

const { app, server } = require('../app');

const api = supertest(app);

describe('Países', () => {
  test('Debería obtener un listado de los países', async () => {
    await api.get('/country').expect(200);
  });
});

afterAll(() => {
  server.close();
});
