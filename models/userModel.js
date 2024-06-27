const { Timestamp } = require('mongodb');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Your username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'please enter another email it must be unique'],
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select : false,
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm password is required'],
        // Make sure the password and confirmPassword match
        validate: {
            validator: function(confirmPassword) {
                return confirmPassword === this.password;
            },
            message: 'Passwords and confirm password are not the same'
        }
    },
    phoneNumber: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: [true, 'Your role is required'],
        enum: ['patient', 'admin', 'worker'],
        default: 'patient'
    }
}, {
    timestamps: true  // Enable timestamps
});

// Middleware to hash password before saving the document
userSchema.pre('save', async function(next) {
    // Proceed if the password field has not been modified
    if (!this.isModified('password')) return next();

    // Hash the password with a cost factor of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Remove the confirmPassword field
    this.confirmPassword = undefined;

    next();
});

userSchema.methods.correctpassword = async function (candidatepassword, userpassword) {
    return await bcrypt.compare(candidatepassword, userpassword)
};

module.exports = mongoose.model('User', userSchema);