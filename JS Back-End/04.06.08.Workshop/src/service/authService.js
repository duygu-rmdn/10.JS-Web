const User = require('../models/User');

const config = require('../config');
const jwt = require('../lib/jsonwebtoken');

exports.getUserByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });

exports.login = async (username, password) => {
    const user = await this.getUserByUsername(username);

    const isValidPassword = await user.validatePassword(password);
    if (!user || !isValidPassword) {
        throw 'Invalid username or password';
    }

    const playload = { username: user.username };
    const token = await jwt.sign(playload, config.SECRET, {expiresIn: '2h'});

    return token;
}

