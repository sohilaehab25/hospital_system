const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Patient = require('./patientModel')
const autoIncrement = require('@alec016/mongoose-autoincrement');
autoIncrement.initialize(mongoose.connection);

// Address Schema
const AddressSchema = new Schema({
    city: { type: String, required: true},
    state: { type: String  },
},{ _id: false });

const DoctorSchema = new Schema({
    fullname: { type: String, required: true },
    specialty: { type: String, required: true },
    address: { type: AddressSchema },

    department:[{ 
        type: Schema.Types.ObjectId,
         ref: 'Department' ,  
    }] ,
    patients: [{
         type: Schema.Types.ObjectId, 
        ref: 'Patient'
     }] 

});

DoctorSchema.plugin(autoIncrement.plugin, {
    model: 'DoctorSchema',
    field: 'doctorId',
    startAt: 1,
    incrementBy: 1
});



module.exports = mongoose.model('DoctorSchema', DoctorSchema)