const MailMessage = require('nodemailer/lib/mailer/mail-message');
const PatientSchema = require('../models/patieentModel');



//add new patient
exports.AddPatient = (req, res, next) => {
    console.log("Request body:", req.body);
    const { fullname, birthDate, age, gender, address, medicalInfo, visits } = req.body;

    if (req.body._id !== undefined) {
        return res.status(400).json({ message: 'ID should not be provided, it will be auto-generated' });
    }

    console.log("Medical info received:", medicalInfo);

    const newPatient = new PatientSchema({
        fullname,
        birthDate,
        age,
        gender,
        address,
        medicalInfo: medicalInfo || {}, // Ensure medicalInfo is an object
        visits
    });

    console.log("New patient object:", newPatient);

    newPatient.save()
        .then(patient => {
            res.status(201).json({ message: 'Patient created successfully', patient });
        })
        .catch(error => {
            console.error("Error saving patient:", error);
            res.status(500).json({ error: error.message });
        });
};


//get all patient
exports.GetAllPatient = (req,res,next)=>{
    PatientSchema.find({})
    .then((patient) =>{
        res.status(200).json(patient);
        })
    .catch ((error)=> next(error));

};

//get patient by id
exports.GetpatientById = (req, res, next) => {
    PatientSchema.findOne({patientId:req.params.id})
    .then((patient)=>{
        if(!patient){
            res.status(404).json({massage:'Patient not found'})
        }
        res.status(200).json(patient);
    })
    .catch((error)=>{next(error)});
}

//update patient
exports.UpdatePatient = async (req, res, next) => {
    const updatedPatientData = req.body; 

    try {
        let patientToUpdate = await PatientSchema.findOne({patientId:req.params.id})
        if (!patientToUpdate) {
            return res.status(404).json({ message: 'There is no patient with this ID' }); 
        }

        // Update each property of the patient with the corresponding property from updatedPatientData
        Object.keys(updatedPatientData).forEach(key => {
            patientToUpdate[key] = updatedPatientData[key];
        });

        // Save the updated patient
        patientToUpdate = await patientToUpdate.save();

        res.status(200).json({ message: 'Patient updated successfully', updatedPatient: patientToUpdate });
    } catch (error) {
        next(error);
    }
};

//delete patient 
// Delete patient by id
exports.DeletePatientById = (req, res, next) => {
    PatientSchema.findOneAndDelete({ patientId: req.params.id })
        .then((patient) => {
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            res.status(200).json({ message: 'Patient deleted successfully', patient });
        })
        .catch((error) => {
            next(error);
        });
};