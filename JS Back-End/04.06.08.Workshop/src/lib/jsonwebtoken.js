const jwtCallback = require('jsonwebtoken');
const util = require('util');

const jwt = {
    sign: jwtCallback.sign,
    verify: jwtCallback.verify
};

module.exports = jwt;