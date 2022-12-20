const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "zKz7RbFmz7gJC5thzKz7RbFmz7gJC5thzKz7RbFmz7gJC5th"

const userSchema = new mongoose.Schema({
    fname:String,
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    confirmpassword:{
        type:String
    },
    tokens:[
        {
            token:String
        }
    ]
});


// password hasing
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,12);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword,12);
    }
    next();
});

// token generating
userSchema.methods.Authorizationoken = async function(){
    const tokengen = jwt.sign({_id:this._id},secretKey,{
        expiresIn:"1d"
    });

    this.tokens = this.tokens.concat({token:tokengen});
    await this.save();
    return tokengen
}

const users = new mongoose.model("users",userSchema);

module.exports = users;