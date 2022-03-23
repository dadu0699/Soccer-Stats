import { DataTypes } from "sequelize";
import db from "../db/connection";

const Bitacora = db.define('Bitacora', {
    bitacoraID: {
        type: DataTypes.INTEGER,
        field: 'bitacoraID',
        primaryKey: true,
        autoIncrement: true
    },
    accion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombreTabla: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    registro: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    usuarioID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Bitacora',
    paranoid: true,
    timestamps: false
})

export default Bitacora;