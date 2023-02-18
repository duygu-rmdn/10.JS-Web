const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        validate: [/^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/, 'Email is in incorest format']
    },
    password: {
        type: String,
        minLength: [5, 'Password is too short!'],
        required: [true, 'Password is required!']
    },
    description: {
        type: String,
        maxLength: [40, 'Description is too large!'],
        required: [true, 'Description is required!']
    },
    myAds: [{
        type: mongoose.Types.ObjectId,
        ref: 'Ad'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;