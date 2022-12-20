require("dotenv").config();
const express = require("express");
const app = express();

require("./db/conn");
const router = require("./Routes/router");
const cors = require("cors");
const PORT = 8006


app.use(express.json());
app.use(cors());
app.use(router);



app.listen(PORT,()=>{
    console.log("server is start")
})