const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;

//Environment variables
require("dotenv").config({path: `.env.${process.env.NODE_ENV}`});

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/',require('./routes/hello-world.route'));
app.use('/esb/team',require('./routes/create.route'));
app.use('/esb/team',require('./routes/update.route'));
app.use('/esb/team',require('./routes/get.one'));
app.use('/esb/team',require('./routes/get.all'));
app.use('/esb/team',require('./routes/delete.route'));

app.listen(port, () => {
    console.log("Server team in the port", port);
});

module.exports = app;