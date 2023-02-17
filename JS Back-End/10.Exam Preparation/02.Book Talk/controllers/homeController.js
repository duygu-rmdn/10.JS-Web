const router = require('express').Router();
const User = require('../models/User');
const bookService = require('../services/bookService');

router.get('/', (req, res) => {
    const title = 'Book Store';
    res.render('home', { title });
});

router.get('/profile', async (req, res) => {
    const title = 'Profile Page';
    const user = await User.findById(req.user._id).lean();

    let book = await bookService.getUsersBooks(req.user._id);
    res.render('home/profile', { user, title, book });
})

module.exports = router;
