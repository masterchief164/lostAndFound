require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express")
const app = express();
const Router = require("./routes/router");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(Router);

mongoose.connect(process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.log(err);
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
