const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name is too short'],
        required: [true, 'All fields are required!']
    },
    image: {
        type: String,
        required: [true, 'All fields are required!'],
        validate: [/^https?:\/\//, 'The Crypto Image should start with http:// or https://']
    },
    price: {
        type: Number,
        min: [0, 'The Price should be a positive number'],
        required: [true, 'All fields are required!']
    },
    description: {
        type: String,
        minLength: [10, 'Description is too short'],
        required: [true, 'All fields are required!']
    },
    payment: {
        type: String,
        required: [true, 'All fields are required!'],
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal']
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    buyers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;