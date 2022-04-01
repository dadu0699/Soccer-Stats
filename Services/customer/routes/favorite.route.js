const express = require('express');
const router = express.Router();

const {
  verFavoritos,
  agregarFavorito,
} = require('../controllers/favorite.controller');
const validateToken = require('../middlewares/validateToken');

router
  .route('/')
  .get(validateToken, verFavoritos)
  .post(validateToken, agregarFavorito);

module.exports = router;
