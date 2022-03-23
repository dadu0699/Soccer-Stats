const matchModel = require('../models/match.model');
const logModel = require('../models/log.model');

const crearPartido = (req, res) => {
  matchModel.crearPartido(req.body, (err, results) => {
    if (err) return response(res, 400, 'Error al crear partido.', [err]);

    logModel.agregarLog(
      {
        accion: 'CREATE',
        nombreTabla: 'Partido',
        registro: `Nuevo partido, id de partido ${results['insertId']}`,
        usuarioID: req.user['id_user'],
      },
      (error, _result) => {
        if (error)
          return response(res, 400, 'Error al crear partido.', [error]);

        response(res, 200, 'Partido creado con éxito.', [results]);
      }
    );
  });
};

const obtenerPartidos = (req, res) => {
  matchModel.obtenerPartidos(req.query, (err, results) => {
    if (err) return response(res, 400, 'Error al obtener partido(s).', [err]);

    response(res, 200, 'Partido(s) obtenido(s) con éxito.', [results]);
  });
};

const actualizarPartido = (req, res) => {
  matchModel.actualizarPartido(req.body, (err, results) => {
    if (err) return response(res, 400, 'Error al actualizar partido.', [err]);

    logModel.agregarLog(
      {
        accion: 'UPDATE',
        nombreTabla: 'Partido',
        registro: `Partido ${req.body.id} actualizado`,
        usuarioID: req.user['id_user'],
      },
      (error, _result) => {
        if (error)
          return response(res, 400, 'Error al actualizar partido.', [error]);

        response(res, 200, 'Partido actualizado con éxito.', [results]);
      }
    );
  });
};

const eliminarPartido = (req, res) => {
  matchModel.eliminarPartido(req.body, (err, results) => {
    if (err) return response(res, 400, 'Error al eliminar partido.', [err]);

    logModel.agregarLog(
      {
        accion: 'DELETE',
        nombreTabla: 'Partido',
        registro: `Partido ${req.body.id} eliminado`,
        usuarioID: req.user['id_user'],
      },
      (error, _result) => {
        if (error)
          return response(res, 400, 'Error al eliminar partido.', [error]);

        response(res, 200, 'Partido eliminado con éxito.', [results]);
      }
    );
  });
};

const response = (res, status, msg, data) => {
  res.status(status).send({ status, msg, data });
};

module.exports = {
  crearPartido,
  obtenerPartidos,
  actualizarPartido,
  eliminarPartido,
};
