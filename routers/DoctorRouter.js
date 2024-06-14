const express = require('express');
const Router = express.Router();

const DoctorController = require('../controller/DoctorController');
const DoctorValidator = require('../modelware/validation/DoctorValidation');

Router.route('/doctors')
    .post(DoctorValidator.validateDoctor, DoctorController.AddDoctor )


Router.route('/doctor/:id')
.get(DoctorController.getDoctorById)




module.exports = Router    

