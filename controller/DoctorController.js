const DoctorSchema = require('../models/DoctorModel');
const patient = require('../models/patientModel');
const Department = require('../models/DepartmentModel');



// Add new doctor
exports.AddDoctor = (req, res, next) => {
    if (req.body.doctorId !== undefined) {
        return res.status(400).json({ message: 'ID should not be provided, it will be auto-generated' });
    }

    const newDoctor = new DoctorSchema(req.body);

    newDoctor.save()
        .then(doctor => {
            res.status(201).json({ message: 'Doctor created successfully', doctor });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};

// Get doctor by id
exports.getDoctorById = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const doctor = await DoctorSchema.findById(doctorId)
            .populate('department')
            .populate('patients');

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json(doctor);
    } catch (error) {
        next(error);
    }
};