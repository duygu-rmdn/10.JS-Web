const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: [4, 'Username is too short!'],
        required: [true, 'Username is required!']
    },
    email: {
        type: String,
        minLength: [10, 'Email is too short!'],
        required: [true, 'Email is required!']
    },
    password: {
        type: String,
        minLength: [3, 'Password is too short!'],
        required: [true, 'Password is required!']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;