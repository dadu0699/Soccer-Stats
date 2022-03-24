const express = require('express');
const router = express.Router();

router.route('/').get((_req, res) => {
  res.status(200).json({
    status: 200,
    msj: 'API running smoothly',
  });
});

module.exports = router;