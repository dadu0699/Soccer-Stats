const postModel = require("../models/post.model");


obtenerNoticias = (req, res) => {
  postModel.get(req.params, (err, results) => {
    if (err) return response(res, 400, 'Error al obtener noticia(s).', err);
    response(res, 200, 'Noticia(s) obtenida(s) con éxito.', results);
  });
};

crearNoticia = (req, res) => {
  postModel.post(req, (err, results) => {
    if (err) return response(res, 400, 'Error al crear noticia.', err);
    response(res, 200, 'Noticia creada con éxito.', results);
  });
};

const response = (res, code, msg, data) => {
  res.status(code).send({ status: code, msg, data });
};

module.exports = {   crearNoticia, obtenerNoticias };
