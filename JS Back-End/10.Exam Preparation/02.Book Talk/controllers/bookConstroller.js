const { IsAuth } = require('../middlewares/authMiddleware');
const { checkIsOwner } = require('../middlewares/bookMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const bookService = require('../services/bookService');

const router = require('express').Router();

router.get('/create', IsAuth, (req, res) => {
    const title = 'Create Page';
    res.render('book/create', { title });
});

router.post('/create', IsAuth, async (req, res) => {
    try {
        const book = await bookService.create({ ...req.body, owner: req.user._id });
        console.log(book);
        res.redirect('/book/catalog');
    } catch (error) {
        console.log(error);
        res.status(400).render('book/create', { error: getErrorMessage(error) });
    }

});

router.get('/catalog', async (req, res) => {
    const title = 'Catalog Page';
    const book = await bookService.getAll().lean();
    res.render('book/catalog', { title, book });
});

router.get('/:bookId/details', async (req, res) => {
    const title = 'Details Page';
    const bookId = req.params.bookId;
    const book = await bookService.getOne(bookId).lean();

    const isOwner = await bookService.isOwner(book.owner, req.user?._id);
    const isWisher = await bookService.isWisher(book, req.user?._id);

    res.render('book/details', { title, book, isOwner, isWisher });
});

router.get('/:bookId/wish', IsAuth, async (req, res) => {
    const title = 'Details Page';
    let book = await bookService.getOne(req.params.bookId);

    const isOwner = await bookService.isOwner(book.owner, req.user?._id);
    const isWisher = await bookService.isWisher(book, req.user?._id);

    if (isOwner || isWisher) {
        return res.redirect('/home/404');
    }

    book.wishings.push(req.user._id);
    console.log(book)
    await book.save();

    res.redirect(`/book/${req.params.bookId}/details`);
});

router.get('/:bookId/edit', checkIsOwner, async (req, res) => {
    const title = 'Edit Page';
    let book = await bookService.getOne(req.params.bookId).lean();

    res.render('book/edit', { book, title });
});

router.post('/:bookId/edit', checkIsOwner, async (req, res) => {
    let book = await bookService.getOne(req.params.bookId).lean();
    try {
        await bookService.update(req.params.bookId, req.body);
        res.redirect(`/book/${req.params.bookId}/details`);
    } catch (error) {
        res.status(400).render('book/edit', { book, error: getErrorMessage(error) });
    }
});

router.get('/:bookId/delete', checkIsOwner, async (req, res) => {
    await bookService.delete(req.params.bookId);
    res.redirect('/book/catalog');
});



module.exports = router;