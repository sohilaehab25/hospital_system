const {param, body, query} = require('express-validator');

exports.insertValidator = [
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
 
    body('status')     
           .isString()
           .withMessage('please enter string values for status'),
    
    body('call_back')   
           .isString()
           .withMessage('please enter string values for call_back'),

            

]

exports.updateValidator = [
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
 
    body('status')     
           .isString()
           .withMessage('please enter string values for status'),
    
    body('call_back')   
           .isString()
           .withMessage('please enter string values for call_back'),

            

]
 
