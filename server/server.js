// PACKAGES //
const path = require('path');
const fs = require('fs');
const express = require('express');


// IMPORTS //
const indexRoutes = require('./routes/index');

// CREATE APP //
const app = express();


// VIEW ENGINE //
app.set('view engine', 'html');
app.engine('html', (p, options, callbacks) => {
  fs.readFile(p, 'utf-8', callbacks);
});

// MIDDLEWARE //
app.use(express.static(path.join(__dirname, '../client')));

// ROUTES //
app.use('/', indexRoutes);

// ERROR HANDLER //
app.use((err, req, res) => {
  res.status(err.status || 500);
});

module.exports = app;
