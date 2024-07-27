const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv").config()

const app = express();
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Server is started")
})

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`port started on ${port}`);
});