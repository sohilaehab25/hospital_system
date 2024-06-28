const express = require('express');
const Router = express.Router();

const AppointmentController = require('../controller/appointmentController');
const {restrictedTo, protect} = require('../modelware/authorizationmiddlaware')

Router.route('/appointment')
.get(protect,restrictedTo('admin'),AppointmentController.getAllAppointments)
.post(protect,restrictedTo('admin','Patient'),AppointmentController.createAppointment)


Router.route('/appointment/:id')
.get(protect,restrictedTo('admin','Patient'),AppointmentController.getAppointmentById)
.put(protect,restrictedTo('admin','Patient'),AppointmentController.UpdateAppointment)
.delete(protect,restrictedTo('admin','Patient'),AppointmentController.DeleteAppointment)

module.exports = Router    