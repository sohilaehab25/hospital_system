const express = require('express');
const router = express.Router();

const{body,param, query, validationResult} = require('express-validator');
const UserController = require('../controller/userController');
const { UpdateValidator, insertValidator} = require('../modelware/validation/uservalidation');

router
router.route('/user')
    .post(insertValidator, UserController.insertuser)
    .get(UserController.getAllUSers);

router.route('/user/:_id')
    .get(UserController.getUserId);   
module.exports = router;   