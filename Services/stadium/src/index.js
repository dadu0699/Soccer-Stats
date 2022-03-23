const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5004;

//Environment variables
require("dotenv").config({path: `.env.${process.env.NODE_ENV}`});

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/',require('./routes/hello-world.route'));
app.use('/stadium',require('./routes/create.route'));
app.use('/stadium',require('./routes/update.route'));
app.use('/stadium',require('./routes/get.one'));
app.use('/stadium',require('./routes/get.all'));
app.use('/stadium',require('./routes/delete.route'));

app.listen(port, () => {
    console.log("Server stadium in the port", port);
});

module.exports = app;