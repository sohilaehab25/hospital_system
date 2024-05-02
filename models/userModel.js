const mongoose = require('mongoose');
//schema of users
const userschema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required : true
    },
    password:{
        type: String,
        required: true
    },
    status:{
        type:String
    },
    call_back: {
        type: String
    }
});

module.exports = mongoose.model('users', userschema)