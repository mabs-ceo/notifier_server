const Notification = require("../models/notification.model");




async function getNotifications(req, res) {
    try {
        const currentDate = new Date();
        const notifications = await Notification.find({dueDate: { $gte: currentDate }})
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
}







module.exports = {
    getNotifications
};