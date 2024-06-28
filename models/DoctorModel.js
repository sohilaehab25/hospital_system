const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Patient = require('./patientModel')

// Address Schema
const AddressSchema = new Schema({
    city: { type: String, required: true},
    state: { type: String  },
},{ _id: false });

const DoctorSchema = new Schema({
    fullname: { type: String, required: true },
    specialty: { type: String, required: true },
    address: { type: AddressSchema },

    patients:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Patient', 
    }, 
     department:[{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Department' , 
    }] ,


});




module.exports = mongoose.model('DoctorSchema', DoctorSchema)