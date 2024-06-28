const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Visit Sub-schema
const VisitSchema = new Schema({
    visitDate: { type: Date, required: true },
    doctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DoctorSchema'
    }],
    departments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Department',
    }],
    notes: { type: String },
    prescriptions: [{ type: String }]
}, { _id: false });



// MedicalInfo Sub-schema
const MedicalInfoSchema = new Schema({
    status: {
        type: String,
        required: true,
        enum: ['fair', 'good', 'bad']
    },
    bloodType: {
        type: String,
        enum: [
            'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O-', 'O+'
        ]
    },
    allergies: { type: String },
    medicalHistory: { type: String },
    currentMedications: { type: String },
    immunizationRecords: { type: String }
},{ _id: false });

// Address Schema (imported or defined here)
const AddressSchema = new Schema({
    street: { type: String},
    city: { type: String, required: true},
    state: { type: String  },
},{ _id: false });


// Patient Schema
const PatientSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date
    },
    age:{
        type: Number
    },
    gender: {
        type: String,
        enum: ['female', 'male'],
        required: true
    },
    address: {
        type: AddressSchema,
        required: true
    },
    medicalInfo: {
        type: MedicalInfoSchema,
        required: true
    },
    visits: [VisitSchema] ,
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Department"
    }

});



module.exports = mongoose.model('Patient', PatientSchema);