const { nextTick } = require('async');
const userschema = require('../models/userModel');
var nodemailer = require("nodemailer");
var randomToken = require("random-token");


exports.insertuser = (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    const {username, email, password, status, call_back } = req.body;
    console.log(req.body);

    const newUser = new userschema({
        username:username,
        email: email,
        password: password,
        status: status,
        call_back: call_back
    });

    newUser.save()
      .then((data) =>{
        res.status(200).json({data});
      })
      .catch((error => next(error)));
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
            return res.status(404).json({ message: 'child not found' });
        }
        res.status(200).json(data);
    }).catch((error) => { next(error) });
    };

    
