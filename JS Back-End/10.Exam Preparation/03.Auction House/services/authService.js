const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');

exports.findByFirstName = (firstName) => User.findOne({ firstName });

exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (firstName, lastName, email, password, repeatPassword) => {
    if (password !== repeatPassword) {
        throw new Error('Password missmatch!');
    }

    //const existingUser = await this.findByUsername(username);
    const existingUser = await User.findOne({
        $or: [
            { email },
            { firstName },
        ]
    });

    if (existingUser) {
        throw new Error('User exists!');
    }

    //TODO: Validate password

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ firstName, lastName, email, password: hashedPassword });

    return this.login(email, password);
};


exports.login = async (email, password) => {
    const user = await this.findByEmail(email);

    if (!user) {
        throw new Error('Invalid Email or Password!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid Email or Password!');
    }

    const playload = {
        _id: user._id,
        email,
        firstName: user.firstName,
    }
    const token = await jwt.sign(playload, SECRET);

    return token;
}