const express = require('express');
const router = express.Router();

const reportes = require('../controllers/report.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/1').get(validateToken, reportes.reporte1);
router.route('/2').get(validateToken, reportes.reporte2);
router.route('/3').get(validateToken, reportes.reporte3);
router.route('/4').get(validateToken, reportes.reporte4);
router.route('/5').get(validateToken, reportes.reporte5);
router.route('/6').get(validateToken, reportes.reporte6);
router.route('/7').get(validateToken, reportes.reporte7);
router.route('/8').get(validateToken, reportes.reporte8);
router.route('/9').get(validateToken, reportes.reporte9);
router.route('/10').get(validateToken, reportes.reporte10);
router.route('/11').get(validateToken, reportes.reporte11);

module.exports = router;
