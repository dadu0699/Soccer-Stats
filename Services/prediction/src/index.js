const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5009;

//Environment variables
require("dotenv").config({path: `.env.${process.env.NODE_ENV}`});

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/prediction', require('./routes/predic.route'));

app.listen(port, () => {
    console.log("Server prediction in the port", port);
});

module.exports = app;