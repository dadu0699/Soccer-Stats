const express = require('express');
const router = express.Router();

const { reporte1 } = require('../controllers/reporte.controller');

router.route('/person').get(reporte1);

module.exports = router;
