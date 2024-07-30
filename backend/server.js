const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(cors());

//connect mongoDb
connectDB();

app.use('/api/user',require('./routes/userRoute'));

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`port started on ${port}`);
});