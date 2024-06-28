const { validationResult } = require('express-validator');
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
        const doctor = await DoctorSchema.findById(doctorId).populate('department').populate('patients');

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json(doctor);
    } catch (error) {
        next(error);
    }
};


//get all doctors
exports.GetAllDoctors = (req,res,next)=>{
    DoctorSchema.find({})
    .then((doctors) =>{
        res.status(200).json(doctors);
        })
    .catch ((error)=> next(error));

};


// Update doctor
exports.UpdateDoctor = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const updatedDoctorData = req.body;

    try {
        let doctorToUpdate = await DoctorSchema.findOne({ _id: req.params.id });
        if (!doctorToUpdate) {
            return res.status(404).json({ message: 'There is no doctor with this ID' });
        }

        // Update doctor fields
        Object.keys(updatedDoctorData).forEach(key => {
            doctorToUpdate[key] = updatedDoctorData[key];
        });

        doctorToUpdate = await doctorToUpdate.save();
        res.status(200).json({ message: 'Doctor updated successfully', updatedDoctor: doctorToUpdate });
    } catch (error) {
        next(error);
    }
};

// Delete doctor by id
exports.DeleteDoctorById = (req, res, next) => {
    DoctorSchema.findOne({ DoctorId: req.params._id })
        .then((doctor) => {
            if (!doctor) {
                return res.status(404).json({ message: 'doctor not found' });
            }
            res.status(200).json({ message: 'doctor deleted successfully', doctor });
        })
        .catch((error) => {
            next(error);
        });
};