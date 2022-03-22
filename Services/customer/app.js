const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

// Create Express server
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const apiURL = '/customer';
app.use('/', require('./routes/index.route.js'));
app.use(apiURL, require('./routes/customer.route'));
app.use(`${apiURL}/membership`, require('./routes/membership.route'));

// Port assignment
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// Catch 404
app.use(require('./middlewares/notFound'));

module.exports = {
  app,
  server,
};
