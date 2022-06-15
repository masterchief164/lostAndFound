require("dotenv").config();

const cors = require("cors");
const express = require("express")
const app = express();
const logger = require('morgan');
const Router = require("./routes/index.router");

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: "http://localhost:3000"}));

app.use('/', Router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log('\n\n Creating 404\n\n');
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.status(404).send('Not Found');
});

module.exports = app;