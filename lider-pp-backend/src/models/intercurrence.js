const mongoose = require('mongoose');

const IntercurrenceSchema = new mongoose.Schema({
    intercurrenceCod: {
        type: String,
        require: true
    },
    activeCod: {
        type: String,
        require: true
    },
    intercurrenceDate: {
        type: Date,
        require: true
    },
    intercurrenceDescription: {
        type: String,
        require: true
    },
    intercurrenceUser: {
        type: String,
        require: true
    }

});

const Intercurrence = mongoose.model('Intercurrence', UserSchema);

module.exports = Intercurrence;