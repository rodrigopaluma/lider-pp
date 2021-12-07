const mongoose = require('mongoose');

const SecretarySchema = new mongoose.Schema({
    secCod: {
        type: String,
        require: true
    },
    secName: {
        type: String,
        require: true
    },
    secAbreviation: {
        type: String,
        require: true,
        unique: true,
    },
    prefCod: {
        type: String,
        require: true
    }
});

const Secretary = mongoose.model('Secretary', UserSchema);

module.exports = Secretary;