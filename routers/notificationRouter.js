const express = require('express');
const Router = express.Router();

const notificationController = require('../controller/notificationController')

Router.route('/notification')
.post(notificationController.CreateNotification)
.get(notificationController.ShowAllNotifications)

Router.route('/notification/:id')
.put(notificationController.UpdateNotification)
.get(notificationController.getNotificationById)
.delete(notificationController.DeleteNotification)


module.exports = Router;