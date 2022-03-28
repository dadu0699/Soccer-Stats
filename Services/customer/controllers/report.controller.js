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

// Jugadores o Técnicos mayores a X años
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

// Jugadores o Técnicos menores a X años
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

// Equipos que participaron en X competición
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

// Equipos de X país
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

// Equipos con X años de antigüedad
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

// Estadios en X país
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

// Estadios con capacidad menor o igual a X
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

// Histórico de partidos de X equipo
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

// Equipos en los que ha estado o dirigido X técnico o jugador.
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

// Partidos donde hubo al menos X goles
const reporte11 = (req, res) => {
  reportModel.reporte11(req.query, (err, results) => {
    if (err)
      return response(
        res,
        400,
        'Error al obtener los partidos donde hubo x cantidad de goles.',
        [err]
      );

    return response(
      res,
      200,
      'Partidos donde hubo x cantidad de goles obtenidos con éxito.',
      results
    );
  });
};

// Jugadores con más X incidencias en Y competición
const reporte12 = (req, res) => {
  reportModel.reporte12(req.query, (err, results) => {
    if (err)
      return response(
        res,
        400,
        'Error al obtener los jugadores con x incidencias en y competición.',
        [err]
      );

    return response(
      res,
      200,
      'Jugadores con x incidencias en y competición obtenidos con éxito.',
      results
    );
  });
};

// Jugadores con más X incidencias y Y competiciones de Z año
const reporte13 = (req, res) => {
  reportModel.reporte13({ ...req.query, ...req.body }, (err, results) => {
    if (err)
      return response(
        res,
        400,
        'Error al obtener los jugadores con x incidencias en y competiciones de z año.',
        [err]
      );

    return response(
      res,
      200,
      'Jugadores con x incidencias en y competiciones de z año obtenidos con éxito.',
      results
    );
  });
};

// Cantidad de X competiciones que ha ganado Y equipo
const reporte14 = (req, res) => {
  reportModel.reporte14({ ...req.query, ...req.body }, (err, results) => {
    if (err)
      return response(
        res,
        400,
        'Error al obtener las competiciones que ha ganado x equipo.',
        [err]
      );

    return response(
      res,
      200,
      'Competencias que ha ganado x equipo obtenidas con éxito.',
      results
    );
  });
};

// Listado de partidos en X año
const reporte15 = (req, res) => {
  reportModel.reporte15(req.query, (err, results) => {
    if (err)
      return response(
        res,
        400,
        'Error al obtener el listado de partidos de un año especifico.',
        [err]
      );

    return response(
      res,
      200,
      'Listado de partidos de un año especifico obtenidos con éxito.',
      results
    );
  });
};

// Listado de partidos entre X equipo contra Y equipo
const reporte16 = (req, res) => {
  reportModel.reporte16(req.query, (err, results) => {
    if (err)
      return response(
        res,
        400,
        'Error al obtener el listado de partidos entre x equipo y y equipo.',
        [err]
      );

    return response(
      res,
      200,
      'Listado de partidos entre x equipo y y equipo obtenidos con éxito.',
      results
    );
  });
};

// Listado de partidos de X equipo
const reporte17 = (req, res) => {
  reportModel.reporte17(req.query, (err, results) => {
    if (err)
      return response(
        res,
        400,
        'Error al obtener el listado de partidos del equipo x.',
        [err]
      );

    return response(
      res,
      200,
      'Listado de partidos del equipo x obtenidos con éxito.',
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
  reporte12,
  reporte13,
  reporte14,
  reporte15,
  reporte16,
  reporte17,
};
