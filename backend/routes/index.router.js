const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const authRouter = require('./auth.route');
const ReportRouter = require('./report.route');
const lostRouter = require('./lost.route');
const foundRouter = require('./found.route');

const router = express.Router();

// swagger docs config

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentation',
    },
    servers: [
      { url: 'http://localhost:8000' },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs),
);

// routes

router.use('/auth', authRouter);
router.use('/report/form', ReportRouter);
router.use('/lost', lostRouter);
router.use('/found', foundRouter);

module.exports = router;
