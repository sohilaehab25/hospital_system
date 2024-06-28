const express = require('express');
const Router = express.Router();

const patientController = require('../controller/PatientController');
const PatientValidation = require('../modelware/validation/patientvalidation');
const{protect,restrictedTo} = require('../modelware/authorizationmiddlaware')

Router.route('/patients')
    .post(protect,restrictedTo('admin'),PatientValidation.Patient, patientController.AddPatient)
    .get(protect,restrictedTo('admin'),patientController.GetAllPatient)



Router.route('/patient/:_id') 
     .get(protect,restrictedTo('admin','patient'),patientController.GetpatientById)   
     .put(protect,restrictedTo('admin','patient'),patientController.UpdatePatient)
     .delete(protect,restrictedTo('admin','patient'),patientController.DeletePatientById)


module.exports = Router;

