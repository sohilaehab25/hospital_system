const {body, params} = require('express-validator');
const DoctorSchema = require('../../models/DoctorModel');
const Patient = require("../../models/patieentModel");

exports.Department=[
    body("name")
        .isString()
        .withMessage("Name should be a string")
        .isLength({ max: 10 })
        .withMessage("Name should not exceed 10 characters"),
    body("Doctors").isMongoId().withMessage("Doctor must be a number").custom(
            async(value)=>{
                const doctorExists = await DoctorSchema.exists({ _id: value });
                if(!doctorExists){
                    throw new Error("doctor doesn't exist");
                }
                return true;
            }),
    
    body("patients")
        .isArray()
        .withMessage("Children should be an array of child IDs")
        .optional()
]