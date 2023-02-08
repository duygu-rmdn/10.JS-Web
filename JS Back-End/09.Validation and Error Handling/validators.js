exports.isEmail = (email) => {
    return /^\w{3,30}@\w{2,10}\.\w{2,10}$/.test(email);
} 