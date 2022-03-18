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
    genero: params.gender,
    fechaNacimiento: params.birth_date,
    fechaRegistro: params.signup_date,
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

module.exports = { getCountry, create, validate };