const mysqlConnection = require('../configs/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const signin = (params, callback) => {
  const user = [params.email, params.password];
  const query = `
        SELECT usuarioID id_user, rol id_rol, estado id_status,
        fechaHoraClaveAcceso expire_date
        FROM Usuario
        WHERE correo = ? AND claveAcceso = ?;
  `;
  return execute(query, user, callback);
}

const validate = (params, callback) => {
  const id = params.id
  const query = `
        UPDATE Usuario
        SET estado = 1
        WHERE usuarioID = ?;
  `;

  return execute(query, id, callback);

}

module.exports = { validate, signin, };
