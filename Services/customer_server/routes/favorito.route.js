const express = require('express');
const router = express.Router();

const { agregarFavorito } = require('../controllers/favorito.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/').post(validateToken, agregarFavorito);

module.exports = router;
