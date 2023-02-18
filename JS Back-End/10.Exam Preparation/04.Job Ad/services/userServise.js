const User = require('../models/User');

exports.getAuthor = (adUserId) => User.findById(adUserId);

exports.getAds = async (email) => {
    let user = await User.findOne({email}).populate('myAds').lean();
    return user.myAds;
}





