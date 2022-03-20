const express = require('express');
const router = express.Router();

const {
  obtenerPaises,
} = require('../controllers/country.controller');

router.route('/').get(obtenerPaises);

module.exports = router;
