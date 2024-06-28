const { nextTick } = require('async');
const userschema = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { token } = require('morgan');

// Generate a token for the new user
// it takes user_id, token secret key, expiry time

const signToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRETE_KEY, {
        expiresIn: '24h'
    });
};

exports.signUp = async (req, res, next) => {
    try {
        const { username, password, phoneNumber, email, role, confirmPassword } = req.body;
        const newUser = new userschema({
            username,
            password,
            confirmPassword,
            phoneNumber,
            email,
            role
        });

        await newUser.save();
        const token = signToken(newUser._id, newUser.role);

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
                token
            },
            message: "Registration successful."
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please enter your email and password" });
    }

    const user = await userschema.findOne({ email }).select("+password");

    if (!user || !(await user.correctpassword(password, user.password))) {
        return res.status(401).json({ message: "Incorrect email or password" });
    }

    const token = signToken(user._id, user.role);
    return res.status(200).json({
        message: "Login successful",
        token
    });
};


exports.forgotpassword = async (req,res,next) =>{
    const user = await userschema.findOne({email: req.body.email});
    if(!user){
        return res.status(404).send({massage:"invalid email please enter valid email"});

    }
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
};

exports.resetpassword = async (req,res,) =>{
    
}