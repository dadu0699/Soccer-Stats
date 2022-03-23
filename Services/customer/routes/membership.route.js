const express = require('express');
const router = express.Router();

const {
  comprarMembresia,
  cancelarMembresia,
} = require('../controllers/membership.controller');
const validateToken = require('../middlewares/validateToken');

router
  .route('/')
  .post(validateToken, comprarMembresia)
  .put(validateToken, cancelarMembresia);

module.exports = router;
