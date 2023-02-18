const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    headline: {
        type: String,
        minLength: [4, 'Headline is too short!'],
        required: [true, 'Headline is required!']
    },
    location: {
        type: String,
        minLength: [8, 'Location is too short!'],
        required: [true, 'Location is required!']
    },
    companyName: {
        type: String,
        minLength: [3, 'Company name  is too short!'],
        required: [true, 'Company name is required!']
    },
    companyDescription: {
        type: String,
        maxLength: [40, 'Description is too large!'],
        required: [true, 'Company description is required!']
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    applied: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;