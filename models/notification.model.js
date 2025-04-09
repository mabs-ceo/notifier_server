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
//     notificationId:{
//              type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//     }
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    
});

const Notification = mongoose.model('Notification', notificationSchema);    

module.exports = Notification;