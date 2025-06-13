'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const apiRoutes = require('./routes/api/v1');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./docs/swagger.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);
app.use('/api/v1', apiRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


module.exports = app;
