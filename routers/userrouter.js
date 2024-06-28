const express = require('express');
const router = express.Router();

const{body,param, query, validationResult} = require('express-validator');
const userController = require('../controller/AdminController');
const {protect, restrictedTo} = require('../modelware/authorizationmiddlaware');



router.route('/user')
    .get(protect,restrictedTo('admin'),userController.getAllUSers);

router.route('/user/:_id')
    .get(protect,restrictedTo('admin'),userController.getUserId);   


module.exports = router;   