const express = require('express');
const router = express.Router();

const { comprarMembresia } = require('../controllers/membresia.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/').post(validateToken, comprarMembresia);

module.exports = router;
