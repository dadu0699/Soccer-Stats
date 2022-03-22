import { DataTypes } from "sequelize";
import db from "../db/connection";

const Pais = db.define('Pais', {
    paisID: {
        type: DataTypes.INTEGER,
        field: 'paisID',
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'Pais',
    paranoid: true,
    timestamps: false
})

export default Pais;