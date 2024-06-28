const Appointment = require('../models/AppointmentModel');
const Patient = require('../models/patientModel');
const Doctor = require('../models/DoctorModel');
const Department = require('../models/DepartmentModel');

//create appointment
exports.createAppointment = async (req, res) => {
    try {
        const { patientId, DoctorId, DepartmentId } = req.body;

        // Check if the patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).send({ error: 'Patient not found' });
        }

        // Check if the doctor exists
        const doctor = await Doctor.findById(DoctorId);
        if (!doctor) {
            return res.status(404).send({ error: 'Doctor not found' });
        }

        // Check if the department exists
        const department = await Department.findById(DepartmentId);
        if (!department) {
            return res.status(404).send({ error: 'Department not found' });
        }

        // Create the appointment
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).send(appointment);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

  //get all appointments
exports.getAllAppointments =  async (req, res) => {
    try {
      const appointments = await Appointment.find().populate('patientId')
      .populate('DoctorId')
      .populate('DepartmentId');
      res.status(200).send(appointments);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  //Get appointment by id
  exports.getAppointmentById = async (req, res) => {
    try {
      const appointment = await Appointment.findById(req.params.id).populate('patientId')
      .populate('DoctorId')
      .populate('DepartmentId');
      if (!appointment) return res.status(404).send();
      res.status(200).send(appointment);
    } catch (error) {
      res.status(500).send(error);
    }
  };
   //update Appointment 
   exports.UpdateAppointment = async (req, res) => {
    try {
      const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!appointment) return res.status(404).send();
      res.status(200).send(appointment);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  //delete Appointment
  exports.DeleteAppointment = async (req, res) => {
    try {
      const appointment = await Appointment.findByIdAndDelete(req.params.id);
      if (!appointment) return res.status(404).json({massage:"there is no appoinmrnt"});
      res.status(200).json({massage:"appointment deleted successfully",appointment});
    } catch (error) {
      res.status(500).send(error);
    }
  };