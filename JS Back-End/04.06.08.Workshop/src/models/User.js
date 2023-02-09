const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: [5, 'Username is too short'],
        unique: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9]+$/.test(value);
            }, message: 'Username should consist only of latin letters and digits!'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password is too short'],
        validate: [/^[a-zA-Z0-9]+$/, 'Password should consist only of latin letters and digits!']
    }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });

});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
});

const User = model('User', userSchema);

module.exports = User;



