const Notification = require("../models/notification.model");




async function getNotifications(req, res) {
    try {
        const currentDate = new Date();
        const notifications = await Notification.find({dueDate: { $gte: currentDate }})
        res.status(200).json({status:'ok',code:200,data:notifications});
    } catch (error) {
        res.status(500).json({ status:'failed',code:500,message: 'Error fetching notifications' });
    }
}







module.exports = {
    getNotifications
};