const express = require('express');
const router = express.Router();

const AuthValidatoer=require('../controller/authController');
const {UserValidator} = require('../modelware/validation/uservalidation');

//authontication
router.route('/signup').post(UserValidator, AuthValidatoer.signUp);
router.route('/login').post(AuthValidatoer.login);


//reset password
router.route('/forgotpassword').post(AuthValidatoer.forgotpassword);
router.route('/resetpassword').post(AuthValidatoer.resetpassword);




module.exports = router;   