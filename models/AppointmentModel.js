const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Patient', 
        required: true
    },
    DoctorId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'DoctorSchema', 
        required: true
    },
    DepartmentId:{
        type: mongoose.Schema.Types.ObjectId, ref:'Department',
        required: true
    },
    date: { type: Date, required: false },
    time: { type: String, required: false },
    status: { type: String, enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' }
  });
module.exports = mongoose.model('Appointment', appointmentSchema);
