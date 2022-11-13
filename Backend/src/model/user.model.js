const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    // TODO:
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: false
    },
    messages: {
        type: Array,
        required: false
    },
    files: {
        type: Array,
        required: false
    },

});

const User = mongoose.model('users', UserSchema);
module.exports = User;