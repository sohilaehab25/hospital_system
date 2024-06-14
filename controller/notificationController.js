const Notification = require('../models/NotficationModel')

//create new notification
exports.CreateNotification = async (req, res) => {
    try {
      const notification = new Notification(req.body);
      await notification.save();
      res.status(201).send(notification);
    } catch (error) {
      res.status(400).send(error);
    }
  };

exports.ShowAllNotifications = async (req, res, next) => {
    try {
      const notifications = await Notification.find().populate('userId');
      res.status(200).send(notifications);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  //get notfication by id
exports.getNotificationById = async (req, res) => {
    try {
      const notification = await Notification.findById(req.params.id).populate('userId');
      if (!notification) return res.status(404).send();
      res.status(200).send(notification);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  //update notification
exports.UpdateNotification =  async (req, res) => {
    try {
      const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!notification) return res.status(404).send();
      res.status(200).send(notification);
    } catch (error) {
      res.status(400).send(error);
    }
  };  

  //delete notification
  exports.DeleteNotification = async (req, res) => {
    try {
      const notification = await Notification.findByIdAndDelete(req.params.id);
      if (!notification) return res.status(404).send();
      res.status(200).send(notification);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  