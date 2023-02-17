const bookService = require('../services/bookService');

exports.checkIsOwner = async (req, res, next) => {
    const currUserId = req.user?._id;
    const book = await bookService.getOne(req.params.bookId).lean();

    const isOwner = currUserId == book.owner;
    if (!isOwner) {
        return res.redirect('/home/404');
    }
    next();
}