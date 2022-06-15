require("dotenv").config();

const cors = require("cors");
const express = require("express")
const app = express();
const Router = require("./routes/index.router");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: "http://localhost:3000"}));

app.use('/', Router);


// error handler
app.use((err, req, res, next) => {
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.status(404).send('Not Found');
});

module.exports = app;