const { nextTick } = require('async');
const userschema = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

// Generate a token for the new user
// it takes user_id, token secret key, expiry time
const signToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRETE_KEY, {
        expiresIn: '24h'
    });
};

exports.signIn = async (req, res, next) => {
    try {
        const { username, password, phoneNumber, email, role, confirmPassword } = req.body;  // Destructure user data from req.body

        // Create a new user instance with the provided data
        const newUser = new userschema({
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            phoneNumber: phoneNumber,
            email: email,
            role: role
        });

        await newUser.save();
        const token = signToken(newUser._id);

        // Send a success response with the new user and token
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
                token: token
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

    const token = signToken(user._id);
    return res.status(200).json({
        message: "Login successful",
        token,
    });
};
