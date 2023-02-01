const { Schema, model, Types } = require('mongoose');

const cubeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 50, // check real length
    },
    imageUrl: {
        type: String,
        required: true,
        // Add http/https validation
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