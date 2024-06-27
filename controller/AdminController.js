const userschema = require('../models/userModel');

exports.getAllUSers = (req,res,next) =>{
    userschema.find({})
    .then((data)=>{
       res.status(200).json(data);
    }).catch((error)=>{next(error)});
};

exports.getUserId = (req,res,next) => {
    userschema.findOne({_id: req.params._id}) 
  .then((data) => {
        if (!data) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(data);
    }).catch((error) => { next(error) });
    };
