const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    topic:{
        type:String,
        enum: ['janaza'],
        required: true,
    }
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
}, { timestamps: true });

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
