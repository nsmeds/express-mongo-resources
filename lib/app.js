const express = require('express');
const app = express();
const errorHandler = require('./error-handler');

const records = require('./routes/records');
const users = require('./routes/users');

app.use('/api/records', records);
app.use('/api/users', users);
app.use(errorHandler);

module.exports = app;