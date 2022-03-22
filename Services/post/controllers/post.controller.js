const postModel = require("../models/post.model");
const { writeLog } = require("../helpers/logHandler")

const obtenerNoticias = (req, res) => {
  postModel.get(req.query, (err, results) => {
    if (err) return response(res, 400, 'Error al obtener noticia(s).', [err]);
    response(res, 200, 'Noticia(s) obtenida(s) con éxito.', results);
  });
};

const crearNoticia = (req, res) => {
  postModel.post(req.body, (err, results) => {
    if (err) return response(res, 400, 'Error al crear noticia.', [err]);

    writeLog({
      accion: 'CREATE',
      nombreTabla: 'Noticia',
      registro: `Creación de una nueva noticia con id ${results['insertId']}`,
      usuarioID: req.user['id_user']
    }, (error, result) => {
      if (err) return response(res, 400, 'Error al crear noticia.', [error]);
      response(res, 200, 'Noticia creada con éxito.', []);
    });

  });
};

const response = (res, code, msg, data) => {
  res.status(code).send({ status: code, msg, data });
};

module.exports = { crearNoticia, obtenerNoticias };
