const mysqlConnection = require('../configs/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const create = (params, callback) => {
  const newUser = [params.name, params.lastname, params.password, params.email,
  params.phone, params.photo, params.gender, params.birth_date,
  params.address, 3, 2, params.id_country]

  const query = `
  INSERT INTO Usuario (nombre, apellido, claveAcceso, correo, telefono, fotografia, genero,
                      fechaNacimiento, direccion, rol, estado, paisID)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  return execute(query, newUser, callback);
};

const getProfile = (params, callback) => {
  const id = params.id
  const query = `
        SELECT u.nombre name, apellido lastname, correo email,
        telefono phone, fotografia photo, genero gender, DATE_FORMAT(fechaNacimiento, "%Y-%m-%d") birth_date,
        direccion address, u.paisID id_country, p.nombre country
        FROM Usuario u, Pais p
        WHERE p.paisID = u.paisID AND usuarioID = ?;
    `;

  return execute(query, id, callback);
};

const update = (params, callback) => {
  const newUser = [params.name, params.lastname, params.password, params.email,
  params.phone, params.photo, params.gender, params.birth_date,
  params.address, params.id_country, params.id]

  const query = `
    UPDATE Usuario
    SET  nombre =  ?, apellido = ?, claveAcceso = ?,
    correo = ?, telefono = ?,  fotografia = ?, genero = ?,
    fechaNacimiento = ?, direccion = ?, paisID = ?
    WHERE usuarioID = ?;
    `;

  return execute(query, newUser, callback);
}

const deleteAccount = (params, callback) => {
  const id = params.id
  const query = `
        UPDATE Usuario
        SET estado = 3
        WHERE usuarioID = ?;
  `;

  return execute(query, id, callback);
}

module.exports = { create, getProfile, update, deleteAccount };
