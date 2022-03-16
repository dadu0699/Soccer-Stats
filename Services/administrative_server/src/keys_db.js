require("dotenv").config();

let db_credentials = {
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB
    /*sslmode : 'require'*/
}

module.exports = db_credentials;