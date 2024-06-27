const express = require('express');
const router = express.Router();

const{body,param, query, validationResult} = require('express-validator');
const AuthValidatoer=require('../controller/authController');
const userController = require('../controller/AdminController')
const {UserValidator} = require('../modelware/validation/uservalidation');

//authontication
router.route('/signin').post(UserValidator, AuthValidatoer.signIn);
router.route('/login').post(AuthValidatoer.login);


router.route('/user')
    .get(userController.getAllUSers);

router.route('/user/:_id')
    .get(userController.getUserId);   


module.exports = router;   