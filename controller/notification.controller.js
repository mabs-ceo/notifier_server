const Notification = require("../models/notification.model");
const Provider = require("../models/providers.model");
const Tokens = require("../models/token.model");

const admin = require("../configs/firebase"); 

async function getNotifications(req, res) {
    try {
        const currentDate = new Date();
        const notifications = await Notification.find({dueDate: { $gte: currentDate }})
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
}

async function createNotifications(req, res) {
    try {
        // const userId = req.params.userId;
        // if(!userId) { 
        //     return res.status(400).json({ message: 'User ID is required' });
        //   }
        //   const user = await Provider.findById(userId);
        // if (!user) {
        //     return res.status(404).json({ message: 'User not found' });
        // }
        // Extract the notification details from the request body
        const { name, postal,dueDate,contact } = req.body;
     console.log('create Notification')
        const newNotification = new Notification({ name, postal,dueDate ,contact });
        await newNotification.save();
      const response = await sendNotification({title:'Janaza Notification',body:'There is a new notification.'});
        console.log(response);
        res.status(201).json(newNotification);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating notification', error });
    }
}

async function sendNotification({title,body}) {
     const Reftoken= [
        'cws-rMtKt6oZcudRThc3Z-:APA91bEk6I26u0WBwrBeNcYrBrsMyMXCFAfP4qOst6cmMoKGLXjAuTunVIlYNsJ3vo_Afeja8uzQ_Lzk4CR7nJotdCmMTWh8j7CMKvebdUHmEqrKJ_fwWx0',     
        'cws-rMtKt6oZcudRThc3Z-:APA91bHIYpKb55mkUPAOa8Uj6gMAvNHEGzSLglUNj4MuqoQNHeOWVIAM-WBZKcxjU1Is5M6Ps2FagfIV-xbFdPsF-6OnfsBfHE4UQc0AHWdIlxNbR9_btRk'      
      ] // The user's device token
     
     console.log('tokens')
     try {
        const tokens =await Tokens.find().select('token -_id').exec();
        const tokenArray = tokens.map(token => token.token);
        console.log(tokenArray)
    
        const message = {
           notification: { title, body },
           tokens:Reftoken, // up to 500 tokens in one go
         };
         
     
         admin
         .messaging()
         .sendEachForMulticast(message)
         .then((response) => {
           console.log("Successfully sent message:", response);
         })
         .catch((error) => {
           console.error("Error sending message:", error);
         });
    } catch (error) {
      console.error('Failed to send notification:', error.message);
      return null;
    }
  }

async function getNotificationsByUserId(req, res) {
    try {
        const userId = req.params.userId;
        if(!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const notifications = await Notification.find({ notificationId:userId });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
}
async function deleteNotificationByUserId(req, res) {
    try {
        const notificationId = req.params.id;
        const userId = req.params.userId;
        if(!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        if(!notificationId) {
            return res.status(400).json({ message: 'Notification ID is required' });
        }
        if(notificationId !== userId) {
            return res.status(400).json({ message: 'Notification ID does not match User ID' });
        }
        // Check if the notification exists
        const notification = await Notification.findById(notificationId);
        const user = await Provider.findById(userId);
        if (!notification || !user) {
            // If the notification or user does not exist, return a 404 error
            return res.status(404).json({ message: 'Notification or User not found' });
        }
        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting notification', error });
    }
}

module.exports = {
    getNotifications,createNotifications,getNotificationsByUserId,deleteNotificationByUserId
};