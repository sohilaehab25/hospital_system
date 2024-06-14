const { body, validationResult } = require('express-validator');
const patient = require('../../models/patientModel');
const Department = require('../../models/DepartmentModel');


exports.validateDoctor = [
    body('fullname').isString().withMessage('Please enter the doctor\'s full name').notEmpty(),
    body('specialty').isString().withMessage('Please enter the doctor\'s specialty').notEmpty(),
    body('address').custom(value => typeof value === 'object' && value !== null && !Array.isArray(value)).withMessage('address must be an object'),
    body('address.city').isString().withMessage('City must be a string').notEmpty(),
    body('address.state').isString().withMessage('State must be a string').optional(),
    body('patients').isArray(). withMessage('patients must be an array'),
];
