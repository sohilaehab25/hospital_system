const { body } = require('express-validator');
const DoctorSchema = require('../../models/DoctorModel');
const Patient = require('../../models/patientModel');
const Department = require('../../models/DepartmentModel')

exports.Department = [
    body("name")
        .isString()
        .withMessage("Name should be a string")
        .isLength({ max: 10 })
        .withMessage("Name should not exceed 10 characters"),
      
    body("doctors")
         .isMongoId()
        .isArray()
        .withMessage("Doctors should be an array of doctor IDs")
        .optional(),

    body("patients")
        .isMongoId()
        .isArray()
        .withMessage("Patients should be an array of patient IDs")
        .optional(),
      
];
