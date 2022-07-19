require('dotenv')
  .config();

const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const Router = require('./routes/index.router');

app.use(cookieParser());
app.use(express.urlencoded({
  limit: '50mb',
  extended: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
}));

app.use('/', Router);

module.exports = app;
