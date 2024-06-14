const { nextTick } = require('async');
const userschema = require('../models/userModel');
var nodemailer = require("nodemailer");
var randomToken = require("random-token");


exports.insertuser = (req, res, next) => {
    const { email, password, username } = req.body;
    console.log(req.body);
    userschema.findOne({email}).exec() 
        .then(existingUser => {
            if(existingUser){
                return res.status(400).json({error:"This email is already in use. Please enter another email."})
            }
            
            const newUser = new userschema({
                username: username,
                email: email,
                password: password,
            });
        
            return newUser.save();
        })
        .then(data => {
            res.status(200).json({data, message:"Registration successful."});
        })
        .catch(error => next(error));
};

exports.getAllUSers = (req,res,next) =>{
    userschema.find({})
    .then((data)=>{
       res.status(200).json(data);
    }).catch((error)=>{next(error)});
};

exports.getUserId = (req,res,next) => {
    userschema.findOne({_id: req.params._id}) 
  .then((data) => {
        if (!data) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(data);
    }).catch((error) => { next(error) });
    };

    
