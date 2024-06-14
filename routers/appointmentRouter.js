const AppointmentController = require('../controller/appointmentController');
const express = require('express');
const Router = express.Router();

Router.route('/appointment')
.get(AppointmentController.getAllAppointments)
.post(AppointmentController.createAppointment)


Router.route('/appointment/:id')
.get(AppointmentController.getAppointmentById)
.put(AppointmentController.UpdateAppointment)
.delete(AppointmentController.DeleteAppointment)

module.exports = Router    