const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const bookConstroller = require('./controllers/bookConstroller');

router.use(homeController);
router.use(authController);
router.use('/book', bookConstroller);

router.all('*', (req, res) => {
    const title = '404 Page';
    res.render('home/404', {title});
});

module.exports = router;