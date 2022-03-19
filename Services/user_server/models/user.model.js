const mysqlConnection = require('../configs/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const signin = (params, callback) => {
  const user = [params.email, params.password];
  const query = `
        SELECT usuarioID id_usuario, rol id_rol, estado statusAccount, fechaHoraClaveAcceso expire_date
        FROM Usuario
        WHERE correo = ? AND claveAcceso = ?;
  `;
  return execute(query, user, callback);
}

const getCountry = (params, callback) => {
  const query = `
        SELECT paisID id, nombre2 nicename FROM Pais;
    `;

  return execute(query, null, callback);
};

const getProfile = (params, callback) => {
  const id = params.id
  const query = `
        SELECT u.nombre name, apellido lastname, correo email, 
        telefono telephone, fotografia photo, genero genre, DATE_FORMAT(fechaNacimiento, "%Y-%m-%d") birthday,
        direccion address, u.paisID id_country, p.nombre2 country
        FROM Usuario u, Pais p
        WHERE usuarioID = 39 AND p.paisID = u.paisID;
    `;

  return execute(query, id, callback);
};

const validate = (params, callback) => {
  const id = params.id
  const query = `
        UPDATE Usuario
        SET estado = 1
        WHERE usuarioID = ?;
  `;

  return execute(query, id, callback);

}

const create = (params, callback) => {
  const newUser = [params.name, params.lastname, params.password, params.email,
    params.telephone, params.photo, params.genre, params.birthday, params.created,
    params.address, params.id_rol, params.id_status, params.id_country]

  const query = `
  INSERT INTO Usuario (nombre, apellido, claveAcceso, correo, telefono, fotografia, genero, fechaNacimiento, 
    fechaRegistro, direccion, rol, estado, paisID)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  return execute(query, newUser, callback);
};

module.exports = { getCountry, create, validate, getProfile, signin };