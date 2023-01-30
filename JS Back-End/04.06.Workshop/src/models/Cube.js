const { Schema, model, models} = require('mongoose');

const cubeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 50 
    },
    imageUrl: {
        type: String,
        required: true
        //validavtion
    },
    dificultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    }
    /*accessories: {
        type: Number,
        required: true,
        minLength: 1,
        maxLength: 6
    },*/
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;