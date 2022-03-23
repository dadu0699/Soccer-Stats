const mysqlConnection = require('../configs/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const signin = (params, callback) => {
  const user = [params.email, params.password];
  const query = `
    SELECT usuarioID id_usuario, rol id_rol,
      estado id_status, fechaHoraClaveAcceso expire_date
    FROM Usuario
    WHERE correo = ? AND claveAcceso = ?;
  `;
  return execute(query, user, callback);
};

const validate = (params, callback) => {
  const id = params.id;
  const query = `
    UPDATE Usuario SET estado = 1
    WHERE usuarioID = ?;
  `;

  return execute(query, id, callback);
};

const temporalPassword = (params, callback) => {
  const user = [params.password, params.email];
  const query = `
    UPDATE Usuario SET claveTemporal = ?, fechaHoraClaveAcceso = NOW()
    WHERE correo = ?
  `;
  return execute(query, user, callback);
};

const restablecerPassword = (params, callback) => {
  const user = [params.new_password, params.email, params.temporal_password];
  console.log(user);
  const query = `
    UPDATE Usuario SET claveAcceso = ?,
      claveTemporal = NULL, fechaHoraClaveAcceso = NULL
    WHERE correo = ? AND claveTemporal = ?
      AND MINUTE(TIMEDIFF(NOW(), fechaHoraClaveAcceso)) <= 2
  `;
  return execute(query, user, callback);
};

module.exports = { signin, validate, temporalPassword, restablecerPassword };
