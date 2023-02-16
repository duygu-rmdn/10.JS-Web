const cryptoService = require('../services/cryptoService');

exports.checkIsOwner = async (req, res, next) => {
    const currUserId = req.user?._id;
    const crypto = await cryptoService.getOne(req.params.cryptoId).lean();

    const isOwner = currUserId == crypto.owner;
    if (!isOwner) {
        return res.redirect('/home/404');
    }
    next();
}
