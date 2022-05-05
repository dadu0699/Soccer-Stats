const supertest = require('supertest');

const { app, server } = require('../app');

const api = supertest(app);

describe('Notas', () => {
  // test('Debería agregar una nota', async () => {
  //   await api
  //     .post('/post')
  //     .set('Authorization', `Bearer ${process.env.TOKEN_EMPLEADO}`)
  //     .send({
  //       id_team: 1,
  //       id_user: 1,
  //       title: 'Nueva Noticia',
  //       description: 'Prueba',
  //       date: '2021-05-15',
  //     })
  //     .expect(200);
  // });

  test('Debería obtener un listado de noticias', async () => {
    await api.get('/post').expect(200);
  });
});

afterAll(() => {
  server.close();
});
