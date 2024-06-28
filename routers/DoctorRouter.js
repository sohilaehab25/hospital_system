const express = require('express');
const Router = express.Router();

const DoctorController = require('../controller/DoctorController');
const DoctorValidator = require('../modelware/validation/DoctorValidation');
const {protect, restrictedTo} = require ('../modelware/authorizationmiddlaware')

Router.route('/doctors')
    .post(protect,restrictedTo('admin'),DoctorValidator.validateDoctor, DoctorController.AddDoctor )
    .get(protect,restrictedTo('admin'),DoctorValidator.validateDoctor, DoctorController.GetAllDoctors )


Router.route('/doctor/:id')
.put(protect,restrictedTo('admin','doctor'),DoctorController.UpdateDoctor)
.get(protect,restrictedTo('admin','doctor'),DoctorController.getDoctorById)
.delete(protect,restrictedTo('admin','doctor'),DoctorController.DeleteDoctorById)




module.exports = Router    

