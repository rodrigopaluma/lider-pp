const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    codUser: {
        type: String,
        require: true
    },
    prefCod: {
        type: String,
        require: true
    },
    secCod: {
        type: String,
        require: true
    },
    profileUser: {
        type: String,
        require: true
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;