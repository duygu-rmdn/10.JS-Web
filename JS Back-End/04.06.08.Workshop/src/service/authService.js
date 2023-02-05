const User = require('../models/User');

exports.getUserByUsername = (username) => User.findOne({username});

exports.register = (username, password) => User.create({username, password});

exports.login = async (username, password) => {
    const user = await this.getUserByUsername(username);

    const isValidPassword = await user.validatePassword(password);
    if(!user || !isValidPassword){
        throw 'Invalid username or password';
    }

    return user;
}

