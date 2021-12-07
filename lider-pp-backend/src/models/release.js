const mongoose = require('mongoose');

const ReleaseSchema = new mongoose.Schema({
    releaseCod: {
        type: String,
        require: true
    },
    expirationDate: {
        type: Date,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
});

const Release = mongoose.model('Release', UserSchema);

module.exports = Release;