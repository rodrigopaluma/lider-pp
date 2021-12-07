const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    issuer: {
        type: String,
        require: true
    },
    receiver: {
        type: String,
        require: true
    },
    titleMessage: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    received: {
        type: Boolean,
        require: true
    },
    receivingDate: {
        type: Date
    },
});

const Message = mongoose.model('Message', UserSchema);

module.exports = Message;