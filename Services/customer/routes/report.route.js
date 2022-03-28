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
router.route('/12').get(validateToken, reportes.reporte12);
router.route('/13').get(validateToken, reportes.reporte13);
router.route('/14').get(validateToken, reportes.reporte14);
router.route('/15').get(validateToken, reportes.reporte15);
router.route('/16').get(validateToken, reportes.reporte16);
router.route('/17').get(validateToken, reportes.reporte17);

module.exports = router;
