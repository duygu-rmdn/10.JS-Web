const Ad = require('../models/Ad');
const User = require('../models/User');

exports.create = (data) => Ad.create(data);

exports.getAll = () => Ad.find({});

exports.getOne = (adId) => Ad.findById(adId).populate('applied');

exports.isOwner = (ad, user) => ad.author == user?._id;

exports.update = (adId, data) => Ad.findByIdAndUpdate(adId, data, {runValidators: true});

exports.delete = (adId) => Ad.findByIdAndDelete(adId);

exports.applay = async (adId, userId) => {
    let ad = await this.getOne(adId);
    ad.applied.push(userId);
    await ad.save();
}


exports.myad = async (adId, userId) => {
    //let ad = await this.getOne(adId);
    let user = await User.findById(userId).populate('myAds');
    console.log(user)
    user.myAds.push(adId);
    await user.save();
}