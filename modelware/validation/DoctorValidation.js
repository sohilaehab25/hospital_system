const { body, validationResult } = require('express-validator');
const patient = require('../../models/patieentModel');
const Department = require('../../models/DepartmentModel');


exports.validateDoctor = [
    body('fullname').isString().withMessage('Please enter the doctor\'s full name').notEmpty(),
    body('specialty').isString().withMessage('Please enter the doctor\'s specialty').notEmpty(),
    body('address').custom(value => typeof value === 'object' && value !== null && !Array.isArray(value)).withMessage('address must be an object'),
    body('address.city').isString().withMessage('City must be a string').notEmpty(),
    body('address.state').isString().withMessage('State must be a string').optional(),
    // body('department').isMongoId().withMessage('Department must be a valid ID'),
    body('patients').isArray(). withMessage('patients must be an array'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if the department is valid
        const departmentId = req.body.department;
        try {
            const department = await Department.findById(departmentId);
            if (!department) {
                return res.status(400).json({ error: 'Invalid department ID' });
            }
            next();
        } catch (error) {
            next(error);
        }
    }
];
