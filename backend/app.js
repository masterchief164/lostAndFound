require('dotenv')
  .config();

const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const Router = require('./routes/index.router');
const {dailyUpdate} = require("./scheduler/dailyUpdate");

app.use(cookieParser());

app.use(express.urlencoded({
  limit: '50mb',
  extended: true,
}));

app.enable('trust proxy');

app.use(express.json({ limit: '50mb' }));
app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000","https://frontend-gamma-sage.vercel.app"]
}));

app.use('/', Router);

dailyUpdate();

module.exports = app;
