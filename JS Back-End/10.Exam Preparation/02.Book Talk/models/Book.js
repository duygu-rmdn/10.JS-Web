const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [2, 'Title is too short!'],
        required: [true, 'title is required!']
    },
    author: {
        type: String,
        minLength: [5, 'Author is too short!'],
        required: [true, 'author is required!']
    },
    image: {
        type: String,
        required: [true, 'image is required!'],
        validate: [/^https?:\/\//, 'The Book Image should start with http:// or https://']
    },
    review: {
        type: String,
        minLength: [10, 'Review is too short!'],
        required: [true, 'review is required!']
    },
    genre: {
        type: String,
        minLength: [3, 'Genre is too short!'],
        required: [true, 'genre is required!']
    },
    stars: {
        type: Number,
        required: [true, 'stars are required!'],
        min: [1, 'Stars shoul be between 1 and 5!'],
        max: [5, 'Stars shoul be between 1 and 5!'],
    },
    wishings: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;