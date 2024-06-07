const { body, validationResult } = require('express-validator');

exports.Patient = (req, res, next) => {
    // Define validation rules for the entire patient schema
    const schema = {
        fullname: {
            isString: {
                errorMessage: 'Please enter your full name'
            },
            notEmpty: true
        },
        birthDate: {
            isDate: {
                errorMessage: 'Please provide a valid birth date'
            },
            notEmpty: true
        },
        age: {
            isNumeric: {
                errorMessage: 'Age must be a number'
            }
        },
        gender: {
            isIn: {
                options: [['female', 'male']],
                errorMessage: 'Gender must be either female or male'
            },
            notEmpty: true
        },
        address: {
            isObject: {
                errorMessage: 'Address must be an object'
            },
            notEmpty: true
        },
        'address.street': {
            isString: {
                errorMessage: 'Street must be a string'
            },
            optional: true
        },
        'address.city': {
            isString: {
                errorMessage: 'City must be a string'
            },
            notEmpty: true
        },
        'address.state': {
            isString: {
                errorMessage: 'State must be a string'
            },
            optional: true
        },
        medicalInfo: {
            isObject: {
                errorMessage: 'Medical info must be an object'
            },
            optional: true
        }
        
    };



    // If validation passes, proceed to the next middleware
    next();
};
