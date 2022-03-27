const reportModel = require('../models/report.model');

// Jugadores o Técnico de X equipo
const reporte1 = (req, res) => {
  let reportOBJ;

  if (req.query['player'] == 0) {
    reportOBJ = reportModel.reporte1Jugadores;
  } else {
    reportOBJ = reportModel.reporte1Directores;
  }

  reportOBJ(req.query, (err, results) => {
    if (err)
      return response(
        res,
        400,
        'Error al obtener los jugadores o técnico del equipo.',
        [err]
      );

    return response(
      res,
      200,
      'Jugadores o técnico del equipo obtenidos con éxito.',
      results
    );
  });
};

const reporte2 = (req, res) => {
  let reportOBJ;

  if (req.query['player'] == 0) {
    reportOBJ = reportModel.reporte2Jugadores;
  } else {
    reportOBJ = reportModel.reporte2Directores;
  }

  reportOBJ(req.query, (err, results) => {
    if (err)
      return response(
        res,
        400,
        'Error al obtener los jugadores o técnicos mayores a x años.',
        [err]
      );

    return response(
      res,
      200,
      'Jugadores o técnicos mayores a x años obtenidos con éxito.',
      results
    );
  });
};

const reporte3 = (req, res) => {
  let reportOBJ;

  if (req.query['player'] == 0) {
    reportOBJ = reportModel.reporte3Jugadores;
  } else {
    reportOBJ = reportModel.reporte3Directores;
  }

  reportOBJ(req.query, (err, results) => {
    if (err)
      return response(
        res,
        400,
        'Error al obtener los jugadores o técnicos menores a x años.',
        [err]
      );

    return response(
      res,
      200,
      'Jugadores o técnicos menores a x años obtenidos con éxito.',
      results
    );
  });
};

const reporte4 = (req, res) => {
  reportModel.reporte4(req.query, (err, results) => {
    if (err)
      return response(
        res,
        400,
        'Error al obtener los equipos que participaron en una competición.',
        [err]
      );

    return response(
      res,
      200,
      'Equipos que participaron en una competición obtenidos con éxito.',
      results
    );
  });
};

const reporte5 = (req, res) => {
  reportModel.reporte5(req.query, (err, results) => {
    if (err)
      return response(res, 400, 'Error al obtener los equipos de un país.', [
        err,
      ]);

    return response(
      res,
      200,
      'Equipos de un país obtenidos con éxito.',
      results
    );
  });
};

const reporte6 = (req, res) => {
  reportModel.reporte6(req.query, (err, results) => {
    if (err)
      return response(
        res,
        400,
        'Error al obtener los equipos con x años de antigüedad.',
        [err]
      );

    return response(
      res,
      200,
      'Equipos con x años de antigüedad obtenidos con éxito.',
      results
    );
  });
};

const reporte7 = (req, res) => {
  reportModel.reporte7(req.query, (err, results) => {
    if (err)
      return response(res, 400, 'Error al obtener los estadios de un país.', [
        err,
      ]);

    return response(
      res,
      200,
      'Estadios de un país obtenidos con éxito.',
      results
    );
  });
};

const reporte8 = (req, res) => {
  reportModel.reporte8(req.query, (err, results) => {
    if (err)
      return response(
        res,
        400,
        'Error al obtener los estadios con capacidad menor o igual a x.',
        [err]
      );

    return response(
      res,
      200,
      'Estadios con capacidad menor o igual a x obtenidos con éxito.',
      results
    );
  });
};

const reporte9 = (req, res) => {
  reportModel.reporte9(req.query, (err, results) => {
    if (err)
      return response(
        res,
        400,
        'Error al obtener el histórico de partidos del equipo x.',
        [err]
      );

    return response(
      res,
      200,
      'Histórico de partidos del equipo x obtenidos con éxito.',
      results
    );
  });
};

const reporte10 = (req, res) => {
  let reportOBJ;

  if (req.query['player'] == 0) {
    reportOBJ = reportModel.reporte10Jugador;
  } else {
    reportOBJ = reportModel.reporte10Director;
  }

  reportOBJ(req.query, (err, results) => {
    if (err)
      return response(
        res,
        400,
        'Error al obtener los jugadores o técnico del equipo.',
        [err]
      );

    return response(
      res,
      200,
      'Jugadores o técnico del equipo obtenidos con éxito.',
      results
    );
  });
};

const reporte11 = (req, res) => {
  reportModel.reporte11(req.query, (err, results) => {
    if (err)
      return response(
        res,
        400,
        'Error al obtener el histórico de partidos del equipo x.',
        [err]
      );

    return response(
      res,
      200,
      'Histórico de partidos del equipo x obtenidos con éxito.',
      results
    );
  });
};

const response = (res, status, msj, data) => {
  res.status(status).send({ status, msj, data });
};

module.exports = {
  reporte1,
  reporte2,
  reporte3,
  reporte4,
  reporte5,
  reporte6,
  reporte7,
  reporte8,
  reporte9,
  reporte10,
  reporte11,
};