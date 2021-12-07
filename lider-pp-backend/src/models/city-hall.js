const mongoose = require('mongoose');

const CityHallSchema = new mongoose.Schema({
    prefCod: {
        type: String,
        require: true,
        unique: true
    },
    prefNome: {
        type: String,
        require: true
    },
    prefEstado: {
        type: String,
        require: true
    }

});

const CityHall = mongoose.model('CityHall', CityHallSchema);

module.exports = CityHall;