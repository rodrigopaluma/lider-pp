const mongoose = require('mongoose');

mongoose.connect('_mongodb://localhost/liderpp', { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;