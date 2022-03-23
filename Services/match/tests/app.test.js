const supertest = require('supertest');

const { app, server } = require('../app');

const api = supertest(app);

describe('Partidos', () => {
  test('Debería eliminar un partido', async () => {
    await api
      .delete('/match')
      .set('Authorization', `Bearer ${process.env.TOKEN_EMPLEADO}`)
      .send({
        id: 25012,
      })
      .expect(200);
  });

  test('Debería obtener un listado de partidos', async () => {
    await api.get('/match').expect(200);
  });
});

afterAll(() => {
  server.close();
});
