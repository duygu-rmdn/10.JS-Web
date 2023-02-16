const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: [5, 'Username is too short'],
        required: [true, 'Username is required!'],
    },
    email: {
        type: String,
        minLength: [10, 'Email minLenght must be more than 10 charecters!'],
        required: [true, 'Email is required!']
    },
    password: {
        type: String,
        minLength: [4, 'Password minLenght must be more than 4 charecters!'],
        required: [true, 'Password is required!']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;