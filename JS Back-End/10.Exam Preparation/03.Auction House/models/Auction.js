const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [4, 'Title is too short!'],
        required: [true, 'title is required!']
    },
    description: {
        type: String,
        maxLength: [200, 'Description should be max 200 charecters long']
    },
    category: {
        type: String,
        required: true,
        enum: ['estate', 'vehicles', 'furniture', 'electronics', 'other']
    },
    imageUrl: {
        type: String,
        validate: [/^https?:\/\//, 'The Auction Image should start with http:// or https://']
    },
    price: {
        type: Number,
        min: [0, 'The price cannot be negative!'],
        required: [true, 'price is required!']
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    bidder: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;