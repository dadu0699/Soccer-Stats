const mysqlConnection = require('../configs/database');

const execute = (query, params, callback) => {
  mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

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
  const user = {
    nombre: params.name,
    apellido: params.lastname,
    claveAcceso: params.password,
    correo: params.email,
    telefono: params.telephone,
    fotografia: params.photo,
    genero: params.genre,
    fechaNacimiento: params.birthday,
    fechaRegistro: params.created,
    direccion: params.address,
    rol: params.id_rol,
    estado: params.id_status,
    paisID: params.id_country
  };
  const newUser = [user.nombre, user.apellido, user.claveAcceso, user.correo, user.telefono, user.fotografia,
  user.genero, user.fechaNacimiento, user.fechaRegistro, user.direccion, user.rol, user.estado, user.paisID]

  const query = `
  INSERT INTO Usuario (nombre, apellido, claveAcceso, correo, telefono, fotografia, genero, fechaNacimiento, fechaRegistro, direccion, rol, estado, paisID)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  return execute(query, newUser, callback);
};

module.exports = { getCountry, create, validate, getProfile };