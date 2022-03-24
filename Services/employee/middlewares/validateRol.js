module.exports = (req, res, next) => {
  const rol = req.user['id_rol'];

  if (rol != 1 && rol != 2)
    return res.status(401).send({ status: 401, msg: 'Unauthorized', data: [] });

  next();
};
