const DepartmentModel = require('../models/DepartmentModel');
const Department = require('../models/DepartmentModel');
const DoctorSchema = require('../models/DoctorModel');
const PatientSchema = require('../models/patientModel');


exports.addDepartment = async (req, res, next) => {
    try {
        const { name, doctors, patients } = req.body;
        // Check if the department name already exists
        const existingDepartment = await Department.findOne({ name });
        if (existingDepartment) {
            return res.status(401).json({ error: `Department with this name "${name}" already exists` });
        }
        // Check if all doctors exist and are not assigned to any other department
        for (const doctorId of doctors) {
            const doctor = await DoctorSchema.findById(doctorId);
            if (!doctor) {
                return res.status(404).json({ error: `Doctor with ID ${doctorId} not found` });
            }
            const departmentWithDoctor = await Department.findOne({ doctors: doctorId });
            if (departmentWithDoctor) {
                return res.status(400).json({ error: `Doctor with ID ${doctorId} is already assigned to another department` });
            }
        }

        // Check if all patients exist
        for (const patientId of patients) {
            const patient = await PatientSchema.findById(patientId);
            if (!patient) {
                return res.status(404).json({ error: `Patient with ID ${patientId} not found` });
            }
        }

        // Create the new department
        const newDepartment = new Department({ name, doctors, patients });
        await newDepartment.save();

        res.status(201).json({ message: 'Department created successfully', data: newDepartment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPatientInTheDepartment= async (req, res) =>{
    try {
        const department = await Department.findById(req.params._id).populate('patients');
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.status(200).json(department.patients);0
        console.log(department.patients)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDoctorInTheDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params._id).populate('doctors');
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }
        // Send only the populated doctors field in the response
        res.status(200).json(department.doctors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllDepartments = async (req, res, next) => {
    try {
        const departments = await Department.find({})
            .populate('doctors') // Populate the 'doctors' field with actual doctor documents
            .populate('patients')

        res.status(200).json(departments);
    } catch (error) {
        next(error);
    }
};

exports.getDepartmentById = async (req, res, next) => {
    try {
        const department = await Department.findById(req.params._id)
        .populate('doctors')
        .populate('patients');
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(200).json(department);
    } catch (error) {
        next(error);
    }
}

// Update department
exports.updateDepartment = async (req, res, next) => {
    const updatedDepartmentData = req.body;

    try {
        let departmentToUpdate = await Department.findById(req.params._id);
        if (!departmentToUpdate) {
            return res.status(404).json({ message: 'There is no department with this ID' });
        }

        // Update department fields
        Object.keys(updatedDepartmentData).forEach(key => {
            departmentToUpdate[key] = updatedDepartmentData[key];
        });

        departmentToUpdate = await departmentToUpdate.save();
        res.status(200).json({ message: 'Department updated successfully', updatedDepartment: departmentToUpdate });
    } catch (error) {
        next(error);
    }
};

// Delete department by id
exports.deleteDepartmentById = (req, res, next) => {
    Department.findOneAndDelete(req.params._id)
        .then((department) => {
            if (!department) {
                return res.status(404).json({ message: 'Department not found' });
            }
            res.status(200).json({ message: 'Department deleted successfully', department });
        })
        .catch((error) => {
            next(error);
        });
};



