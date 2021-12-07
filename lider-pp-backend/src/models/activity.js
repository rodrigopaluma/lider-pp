const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    activityCode: {
        type: String,
        require: true
    },
    activityName: {
        type: String,
        require: true
    },
    activityPriori: {
        type: String,
        require: true
    },
    activityState: {
        type: String,
        require: true
    },
    responsible: {
        type: String,
        require: true
    },
    assigned: {
        type: String,
        require: true
    },
    estimatedStart: {
        type: Date,
        default: Date.now
    },
    estimatedEnd: {
        type: Date,
        default: Date.now
    },
    estimatedValue: {
        type: Number,
        require: true
    },
    realStart: {
        type: Date
    },
    realEnd: {
        type: Date
    },
    realValue: {
        type: Number,
        require: true
    },
    document: {
        type: String,
        require: false
    },
    prefCod: {
        type: String,
        require: true
    },
    secCod: {
        type: String,
        require: true
    },
    followUp: {
        type: String,
        require: true
    },

});

const Activity = mongoose.model('Activity', UserSchema);

module.exports = Activity;