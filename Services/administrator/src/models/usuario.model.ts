import { DataTypes } from "sequelize";
import db from "../db/connection";
import Pais from "./pais.model";

const Usuario = db.define('Usuario', {
    usuarioID: {
        type: DataTypes.INTEGER,
        field: 'usuarioID',
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    claveAcceso: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaHoraClaveAcceso: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fotografia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genero: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: true,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Usuario',
    paranoid: true,
    timestamps: false
})

Usuario.belongsTo(Pais, { as: 'pais', foreignKey: 'paisID' });

export default Usuario;