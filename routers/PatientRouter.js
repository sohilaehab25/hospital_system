const express = require('express');
const Router = express.Router();

const patientController = require('../controller/PatientController');
const PatientValidation = require('../modelware/validation/patientvalidation')

Router.route('/patients')
    .post(PatientValidation.Patient, patientController.AddPatient)
    .get(patientController.GetAllPatient)



Router.route('/patient/:id') 
     .get(patientController.GetpatientById)   
     .put(patientController.UpdatePatient)
     .delete(patientController.DeletePatientById)


module.exports = Router;

