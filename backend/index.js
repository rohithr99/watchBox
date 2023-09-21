//import dotenv
require('dotenv').config();
const express = require('express');
// import cors
const cors = require('cors');
//import connectDB method from config.js
const connectDB = require('./config/db');
const app = express();
const router = require('./routes/router');
const cookieParser = require('cookie-parser');

connectDB();

const PORT = 8000;

app.listen(PORT,() => {
    console.log(`server is running on http://localhost:${PORT}`);
});

app.use(cors());
//cookie-parser manages cookie-based sessions or extracts data from cookies
app.use(cookieParser());
app.use(express.json());
app.use("/",router);
app.get('/',(req, res) => {
    res.send("server is up and running");
});



