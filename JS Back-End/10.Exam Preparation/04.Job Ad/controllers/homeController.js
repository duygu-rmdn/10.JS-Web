const router = require('express').Router();
const adService = require('../services/adService');

router.get('/', async (req, res) => {
    const title = 'Home Page';
    const job = await adService.getAll().lean();
    job.length = 3;

    res.render('home', { title, job });
});

module.exports = router;