import { DataTypes } from "sequelize";
import db from "../db/connection";

const DirectorTecnico = db.define('DirectorTecnico', {
    DirectorTecnicoID: {
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
    paisID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'DirectorTecnico',
    paranoid: true,
    timestamps: false
})

export default DirectorTecnico;