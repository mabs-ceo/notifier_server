const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    googleId: { type: String, unique: true },
    name: { type: String,required: true },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true
    },
    providerUen: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },  
    activatedAt: {
        type: Date,
        default: null
        
    },  
    activationStatus: {
        type: Boolean,
        default: false
    },
    activationLinks: {
        type: [String],
        default:null
        
    },activationDue: {
        type: Date,
        default: null
        
    },
    lastLogin: {
        type: [Date],
        default: null
    },
    notificationCount: {
        type: Number,
        default: 0
    },
    
});

const Provider = mongoose.model('Provider', providerSchema);
module.exports = Provider;