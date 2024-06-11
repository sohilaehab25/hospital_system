const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('@alec016/mongoose-autoincrement');
autoIncrement.initialize(mongoose.connection);

const Patient = require('./patientModel');
const Doctors = require('./DoctorModel');

const DepartmentSchema = new Schema({
    name:{
        type:String,
        required: true,
        unique: true,
    },
    doctors:[{
        type: Schema.Types.ObjectId, 
        ref: 'DoctorSchema'
     }] ,
     patients:[{
        type:Schema.Types.ObjectId,
        refer:'Patient'
     }]
    
})
module.exports = mongoose.model('Department', DepartmentSchema)