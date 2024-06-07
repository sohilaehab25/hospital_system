const { body, validationResult } = require('express-validator');
const DoctorValidator = (req,res,next){
    const schema=({
        fullName: {
            isString: {
                errorMessage: 'Please enter your full name'
            },
            notEmpty: true
        },
        specialty: {
            isString: {
                errorMessage: 'Please enter your full name'
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

    })
}