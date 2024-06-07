const { body } = require('express-validator');
const Doctor = require('../../models/DoctorModel');
const Patient = require('../../models/patieentModel');

exports.Department = [
    body("name")
        .isString()
        .withMessage("Name should be a string")
        .isLength({ max: 10 })
        .withMessage("Name should not exceed 10 characters"),

    body("doctors")
        .isArray()
        .withMessage("Doctors should be an array of doctor IDs")
        .optional(),

    body("doctors.*")
        .isMongoId()
        .custom(async (value, { req }) => {
            const doctorExists = await Doctor.exists({ _id: value });
            if (!doctorExists) {
                throw new Error("Doctor doesn't exist");
            }
            // Check for duplicate IDs
            const duplicateIds = req.body.doctors.filter(id => id === value);
            if (duplicateIds.length > 1) {
                throw new Error("Duplicate doctor IDs found");
            }
            return true;
        }),

    body("patients")
        .isArray()
        .withMessage("Patients should be an array of patient IDs")
        .optional(),

    body("patients.*")
        .isMongoId()
        .custom(async (value, { req }) => {
            const patientExists = await Patient.exists({ _id: value });
            if (!patientExists) {
                throw new Error("Patient doesn't exist");
            }
            // Check for duplicate IDs
            const duplicateIds = req.body.patients.filter(id => id === value);
            if (duplicateIds.length > 1) {
                throw new Error("Duplicate patient IDs found");
            }
            return true;
        })
];