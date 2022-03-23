import { Sequelize } from 'sequelize';

const NODE_ENV = process.env.NODE_ENV || 'development'
require('dotenv').config({
    path: ".env." + NODE_ENV
})

const db = new Sequelize(String(process.env.DATABASE_DB),
    String(process.env.USER_DB),
    String(process.env.PASSWORD_DB), {
    host: String(process.env.HOST_DB),
    dialect: 'mysql',
    logging: false
});

export default db;