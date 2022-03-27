const express = require('express');
const router = express.Router();

const { agregarFavorito } = require('../controllers/favorite.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/').post(validateToken, agregarFavorito);

module.exports = router;
