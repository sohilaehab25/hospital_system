const express = require('express');
const Router = express.Router();
const {protect, restrictedTo} = require('../modelware/authorizationmiddlaware')

const notificationController = require('../controller/notificationController')

Router.route('/notification')
.post(protect,restrictedTo('admin'),notificationController.CreateNotification)
.get(protect,restrictedTo('admin'),notificationController.ShowAllNotifications)

Router.route('/notification/:id')
.put(protect,restrictedTo('admin'),notificationController.UpdateNotification)
.get(protect,restrictedTo('admin'),notificationController.getNotificationById)
.delete(protect,restrictedTo('admin'),notificationController.DeleteNotification)


module.exports = Router;