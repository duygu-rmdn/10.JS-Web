const adService = require('../services/adService');
const userServise = require('../services/userServise');
const { getErrorMessage } = require('../utils/errorUtils');
const { IsAuth } = require('../middlewares/authMiddleware');
const { IsOwner, IsNotApplayed } = require('../middlewares/adMiddleware');

const router = require('express').Router();

router.get('/all-ads', async (req, res) => {
    const title = 'All-Ads Page';
    const ad = await adService.getAll().lean();
    res.render('ad/all-ads', { title, ad });
});

router.get('/create', IsAuth, (req, res) => {
    const title = 'Create Page';
    res.render('ad/create', { title });
});

router.post('/create', IsAuth, async (req, res) => {
    try {
        await adService.create({ ...req.body, author: req.user._id });
        res.redirect('/ad/all-ads');
    } catch (error) {
        console.log(error);
        res.status(400).render('ad/create', { error: getErrorMessage(error) });
    }

});

router.get('/:adId/details', async (req, res) => {
    const title = 'Details Page';
    const ad = await adService.getOne(req.params.adId).lean();
    const author = await userServise.getAuthor(ad.author);
    let isOwer = await adService.isOwner(ad, req.user);
    const applayesCount = ad.applied.length;
    const isApplier = ad.applied.some(x => x._id == req.user?._id);

    res.render('ad/details', { title, ad, author: author.email, isOwer, aplied: isApplier, applayesCount });
});

router.get('/:adId/edit', IsOwner, async (req, res) => {
    const title = 'Edit Page';
    let ad = await adService.getOne(req.params.adId).lean();

    res.render('ad/edit', { title, ad });
});

router.post('/:adId/edit', IsOwner, async (req, res) => {
    let ad = await adService.getOne(req.params.adId).lean();
    try {
        await adService.update(req.params.adId, req.body);
        res.redirect(`/ad/${req.params.adId}/details`);
    } catch (error) {
        console.log(error);
        res.status(400).render('ad/edit', { ad: req.body, error: getErrorMessage(error) });
    }
});

router.get('/:adId/delete', IsOwner, async (req, res) => {
    await adService.delete(req.params.adId);
    res.redirect('/ad/all-ads')
});

router.get('/:adId/applay', IsNotApplayed, async (req, res) => {
    await adService.myad(req.params.adId, req.user._id);
    await adService.applay(req.params.adId, req.user._id);
    res.redirect(`/ad/${req.params.adId}/details`)
});

router.get('/search', IsAuth, async (req, res) => {
    const title = 'Search';

    let ads = await userServise.getAds(req.query.email);

    res.render('ad/search', { title, ads })
});





module.exports = router;