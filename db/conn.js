const mongoose = require("mongoose");
const DB = process.env.DATABASE
// "mongodb://127.0.0.1:27017/UsersHp"

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{
    console.log("database connected")
  }).catch((error)=>{
    console.log("error for db connected",error)
  })