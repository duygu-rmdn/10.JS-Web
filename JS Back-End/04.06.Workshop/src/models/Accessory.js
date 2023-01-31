const {Schema, model, default: mongoose} = require('mongoose');

const accessorySchema = new Schema({
    name: {
        type: String,
        required: true
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
    }
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;
