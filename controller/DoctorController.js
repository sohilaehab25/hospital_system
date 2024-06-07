const Doctor = require('../models/DoctorModel');

// Add new doctor
exports.AddDoctor = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, specialty, address, department, patients } = req.body;

    if (req.body.doctorId !== undefined) {
        return res.status(400).json({ message: 'ID should not be provided, it will be auto-generated' });
    }

    const newDoctor = new Doctor({
        fullname,
        specialty,
        address,
        department,
        patients: patients || []
    });

    newDoctor.save()
        .then(doctor => {
            res.status(201).json({ message: 'Doctor created successfully', doctor });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};
