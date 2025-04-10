const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    postal: {
        type: Number,
        required: true
    },
  contact:{
    type:Number,
    required:true
  },
    dueDate: {
        type: Date,
        default: Date.now
    },  

});

const Notification = mongoose.model('Notification', notificationSchema);    

module.exports = Notification;