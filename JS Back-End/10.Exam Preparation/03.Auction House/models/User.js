const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: [1, 'First name is too short!'],
        required: [true, 'First name is required!']
    },
    lastName: {
        type: String,
        minLength: [1, 'Last name is too short!'],
        required: [true, 'Last name is required!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        validate: /^[A-Za-z]+@[A-Za-z]+.[A-Za-z]+$/
    },
    password: {
        type: String,
        minLength: [5, 'Password is too short!'],
        required: [true, 'Password is required!']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;