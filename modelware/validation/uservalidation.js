const {param, body, query} = require('express-validator');

exports.UserValidator = [
    body('username')
        .isString()
        .notEmpty()
        .withMessage('your user name must be string'),
    body('email')
         .isEmail()
         .notEmpty()
         .withMessage('enter valid email'),
    body('password')  
         .isString()
         .withMessage("Password must be string")
         .isLength({ min: 3, max: 10 })
         .withMessage("Password must be between 3 and 30 characters"),
 
            

]


