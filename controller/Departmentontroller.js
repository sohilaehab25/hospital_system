const Department = require('../models/DepartmentModel');
const Doctor = require('../models/DoctorModel');
const Patient = require('../models/patieentModel');


// Function to check for duplicate patients in existing departments
async function checkDuplicatePatients(patients) {
    const existingDepartments = await Department.find({ patients: { $in: patients } });
    if (existingDepartments.length > 0) {
        const existingPatientIds = existingDepartments.map(dep => dep.patients).flat();
        const duplicatePatientIds = patients.filter(patientId => existingPatientIds.includes(patientId));
        return duplicatePatientIds;
    }
    return [];
}

// Function to check for duplicate doctors in existing departments
async function checkDuplicateDoctors(doctors) {
    const existingDepartments = await Department.find({ doctors: { $in: doctors } });
    if (existingDepartments.length > 0) {
        const existingDoctorIds = existingDepartments.map(dep => dep.doctors).flat();
        const duplicateDoctorIds = doctors.filter(doctorId => existingDoctorIds.includes(doctorId));
        return duplicateDoctorIds;
    }
    return [];
}

exports.addDepartment = async (req, res, next) => {
    try {
        const { name, doctors, patients } = req.body;

        // Check for duplicate patients and doctors
        const duplicatePatients = await checkDuplicatePatients(patients);
        const duplicateDoctors = await checkDuplicateDoctors(doctors);

        if (duplicatePatients.length > 0) {
            return res.status(400).json({ error: 'Duplicate patients found in existing departments', duplicatePatients });
        }

        if (duplicateDoctors.length > 0) {
            return res.status(400).json({ error: 'Duplicate doctors found in existing departments', duplicateDoctors });
        }

        // Create the new department
        const newDepartment = new Department({ name, doctors, patients });
        await newDepartment.save();

        res.status(201).json({ message: 'Department created successfully', department: newDepartment });
    } catch (error) {
        next(error);
    }
};