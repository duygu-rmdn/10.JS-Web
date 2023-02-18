const adService = require('../services/adService');

exports.IsOwner = async (req, res, next) => {
    const ad = await adService.getOne(req.params.adId).lean();
    if (req.user._id != ad.author) {
        return res.redirect('/home/404');
    }
    next();
};

exports.IsNotApplayed = async (req, res, next) => {
    let ad = await adService.getOne(req.params.adId);
    let applayed = ad.applied.some(x => x._id == req.user._id);

    if (applayed) {
        return res.redirect('/home/404');
    }
    next();
};