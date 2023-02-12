const router = require('express').Router();

const authServise = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    await authServise.register(username, email, password, repeatPassword);

    //TODO: login automaticaly
    res.redirect('/');
});

module.exports = router;