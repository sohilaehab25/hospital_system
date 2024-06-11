const { body, param, query } = require('express-validator');
const Doctor = require('../../models/DoctorModel');
const Department = require('../../models/DepartmentModel');

exports.Patient = [
    // Existing validation rules...
    body('fullname').isString().withMessage('Please enter your full name').notEmpty(),
    body('birthDate').isISO8601().withMessage('Please provide a valid birth date').notEmpty(),
    body('age').isNumeric().withMessage('Age must be a number'),
    body('gender').isIn(['female', 'male']).withMessage('Gender must be either female or male').notEmpty(),

    // Custom validation for address
    body('address').custom(value => typeof value === 'object' && value !== null && !Array.isArray(value)).withMessage('address must be an object'),
    body('address.city').isString().withMessage('City must be a string').notEmpty(),
    body('address.state').isString().withMessage('State must be a string').optional(),
    body('medicalInfo').custom(value => typeof value === 'object' && value !== null && !Array.isArray(value)).withMessage('Medical info must be an object').optional(),

    // Visit validation
    body('visits.*.visitDate').isISO8601().withMessage('Visit date must be a valid date').notEmpty(),
    body('visits.*.doctors').isArray().withMessage('Doctors should be an array of doctor IDs').notEmpty(),
    body('visits.*.departments').isArray().withMessage('Departments should be an array of department IDs').notEmpty(),
    body('visits.*.notes').optional().isString().withMessage('Notes must be a string'),
    body('visits.*.prescriptions').optional().isArray().withMessage('Prescriptions must be an array of strings'),

    // // Custom validation logic for doctors and departments
    // async (req, res, next) => {
    //     const visits = req.body.visits || [];

    //     try {
    //         for (const visit of visits) {
    //             const { doctors, departments } = visit;

    //             for (const doctorId of doctors) {
    //                 const doctor = await Doctor.findById(doctorId).populate('Department');
    //                 const doctorDepartments = doctor.Department.map(dept => dept.toString());
    //                 const visitDepartments = Department.map(dept => dept.toString());

    //                 const isDoctorInDepartments = visitDepartments.some(dept => doctorDepartments.includes(dept));
    //                 if (!isDoctorInDepartments) {
    //                     return res.status(400).json({ error: 'All doctors must belong to the specified departments.' });
    //                 }
    //             }
    //         }
    //         next();
    //     } catch (error) {
    //         next(error);
    //     }
    // }
];
