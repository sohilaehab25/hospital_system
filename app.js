var express = require ('express');
var session = require ('express-session');
var cookie = require ('cookie-parser');
var path = require ('path');
var multer = require('multer');
var path = require ('path');
var async = require ('async');
var nodmailer = require ('nodemailer');
var crypto = require ('crypto');
var expressValidator = require ('express-validator');
var  sweetalert = require('sweetalert2');
var mongoose = require('mongoose');
require('dotenv').config();

const authonticationRouter = require('./routers/authonticationRouter')
const userRouter = require('./routers/userrouter');
const PatientRouter = require('./routers/PatientRouter');
const doctorRuter = require('./routers/DoctorRouter');
const departmentRouter = require('./routers/DepartmentRouter');
const notification = require('./routers/notificationRouter');
const Appointment = require('./routers/appointmentRouter');

const server = express();


//portnumber
const port = process.env.PORT || 8080;
// const databse = process.env.DATABASENAME
//connect to databse
mongoose
.connect("mongodb://127.0.0.1:27017/hms")
.then(() => {
  console.log("DB Connected....");
  server.listen(port, () => {
    console.log("I am listening..........", port);
  });
})
.catch((error) => {
  console.log("DB Problem ..." + error);
});



/****************************stracture */
//use ejs
server.set('view engine', 'ejs');
server.use(cookie());
/***********************uses routers as end point;************/

//body barser
server.use(express.json());





//end routing
server.use(authonticationRouter)
server.use(userRouter)
server.use(PatientRouter)
server.use(doctorRuter)
server.use(departmentRouter)
server.use(notification)
server.use(Appointment)


//Not Found mw
server.use((request,response)=>{
    response.status(404).json({data:"Not Found"});
});



// Error MW
server.use((error, request, response, next) => {
    response.status(500).json({ data: `Error from MW ${error}` });
  });
  
