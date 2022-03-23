import { DataTypes } from "sequelize";
import db from "../db/connection";
import Pais from "./pais.model";

const DirectorTecnico = db.define('DirectorTecnico', {
    directorTecnicoID: {
        type: DataTypes.INTEGER,
        field: 'directorTecnicoID',
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
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'DirectorTecnico',
    paranoid: true,
    timestamps: false
})

DirectorTecnico.belongsTo(Pais, { as: 'pais', foreignKey: 'paisID' });

export default DirectorTecnico;