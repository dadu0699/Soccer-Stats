const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;

//Environment variables
require("dotenv").config();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/esb/administrative/',require('./routes/estadio_routes'));
app.use('/esb/administrative/',require('./routes/equipo_routes'));
app.use('/esb/administrative/',require('./routes/partido_routes'));
app.use('/esb/administrative/',require('./routes/competencia_routes'));
app.use('/esb/administrative/',require('./routes/transfer_jugador_routes'));
app.use('/esb/administrative/',require('./routes/transfer_tecnico_routes'));

app.listen(port, () => {
    console.log("Server administrative in the port", port);
});

module.exports = app;