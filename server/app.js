// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('../db/knex.js');
const addQuestionsApi = require('./api/questions');
const addChoicesApi = require('./api/choices');

const app = express();

// // allow cors here if cors does not work

// Setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Add api functions
addQuestionsApi(app);
addChoicesApi(app);

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;

// // allow cors
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
