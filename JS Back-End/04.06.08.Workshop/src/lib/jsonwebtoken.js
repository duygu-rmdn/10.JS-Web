const util = require('util');
const jwtCallback = require('jsonwebtoken');

const jwt = {
    sign: jwtCallback.sign,
    verify: jwtCallback.verify
};

module.exports = jwt;