const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:2,
        max:250
    },
    email:{
        type:String,
        required:true,
        min:5,
        max:250
    },
    password:{
        type:String,
        required:true,
        min:5,
        max:1024
    },
   
}, {timestamps:true});


module.exports = mongoose.model('User', userSchema);