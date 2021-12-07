const mongoose = require('mongoose');

const InterestedSchema = new mongoose.Schema({
    interestedCod: {
        type: String,
        require: true
    },
    activeCod: {
        type: String,
        require: true
    },
    userCod: {
        type: String,
        require: true
    },
});

const Interested = mongoose.model('Interested', UserSchema);

module.exports = Interested;