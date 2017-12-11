require('./config/config');

console.log('*** env?', process.env.NODE_ENV);
const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const routes = require('./routes');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(port, () => {
    console.log(`Api running on port ${port}`);
});

module.exports = app;
