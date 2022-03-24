const supertest = require('supertest');

const { app, server } = require('../app');

const api = supertest(app);

describe('Perfil', () => {
  test('Debería visualizar el perfil de usuario', async () => {
    await api
      .get('/customer')
      .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
      .query({ id: 1 })
      .expect(200);
  });
});

describe('Membresía', () => {
  test('Debería comprar una membresía', async () => {
    await api
      .post('/customer/membership')
      .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
      .send({ id_client: 1 })
      .expect(200);
  });

  test('Debería cancelar la membresía', async () => {
    await api
      .put('/customer/membership')
      .set('Authorization', `Bearer ${process.env.TOKEN_ADMINISTRADOR}`)
      .send({ id_client: 1 })
      .expect(200);
  });
});

afterAll(() => {
  server.close();
});
