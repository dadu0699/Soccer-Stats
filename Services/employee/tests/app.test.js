const supertest = require('supertest');

const { app, server } = require('../app');

const api = supertest(app);

describe('Transferencia Jugador', () => {
  test('Debería obtener un listado de transferencias de los jugadores', async () => {
    await api.get('/employee/player-transfer').expect(200);
  });
});

describe('Transferencia Director Técnico', () => {
  test('Debería obtener un listado de transferencias de los directores técnicos', async () => {
    await api.get('/employee/technical-director-transfer').expect(200);
  });
});

afterAll(() => {
  server.close();
});
