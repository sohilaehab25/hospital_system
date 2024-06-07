const mongoose = require('mongoose');

 const AddressSchema = new mongoose.Schema({
    address: {
        Street: {
             type: String, 
             required: true
             },
        City: {
             type: String,
              required: true},
        State: { 
            type: String,
             required: true },
        Deapartment: {
             type: String, 
             required: true }
        }

});

module.exports = mongoose.module('Address',AddressSchema)