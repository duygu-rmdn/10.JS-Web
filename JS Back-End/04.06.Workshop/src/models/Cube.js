const { Schema, model, Types } = require('mongoose');

const cubeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 50,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.startsWith('http://') || value.startsWith('https://'); 
            },
            message: 'URL is invalid!'
        }
    },
    difficultyLevel: {
        type: Number,
        required: true,
        max: 6,
        min: 1,
    },
    accessories: [{
        type: Types.ObjectId,
        ref: 'Accessory'
    }]
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;