const express = require('express');
const router = express.Router();

const { comprarMembresia } = require('../controllers/membership.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/').post(validateToken, comprarMembresia);

module.exports = router;
