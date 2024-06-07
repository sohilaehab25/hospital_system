const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('@alec016/mongoose-autoincrement');
autoIncrement.initialize(mongoose.connection);

const Patient = require('./patieentModel');
const Doctors = require('./DoctorModel');

const DepartmentSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    Doctors:[{
        type: Schema.Types.ObjectId, 
        ref: 'Doctors'
     }] ,
     patients:[{
        type:Schema.Types.ObjectId,
        refer:'Patient'
     }]
    
})
module.exports = mongoose.model('Department', DepartmentSchema)