const router = require('express').Router();
const auctionService = require('../services/auctionService');
const { IsAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const { categoryies } = require('../constants');
const  User  = require('../models/User');

router.get('/publish', IsAuth, (req, res) => {
    res.render('auction/publish');
});

router.post('/publish', IsAuth, async (req, res) => {
    try {
        await auctionService.create({ ...req.body, author: req.user._id });
        res.redirect('/auction/catalog');
    } catch (error) {
        console.log(error);
        res.status(400).render('auction/publish', { error: getErrorMessage(error) });
    }
});

router.get('/catalog', async (req, res) => {
    const auction = await auctionService.getAll().lean();
    res.render('auction/catalog', { auction });
});

router.get('/:auctionId/details', async (req, res) => {
    let auction = await auctionService.getOne(req.params.auctionId).lean();
    let category = categoryies[auction.category];

    const isBidder = await auctionService.isBidder(auction, req.user._id);
    const isOwner = await auctionService.isOwner(auction, req.user?._id);
    const bidder = await User.findById(auction.bidder);

    res.render('auction/details', { auction, category, isOwner, isBidder, bidder: bidder?.firstName });
});

router.get('/:auctionId/delete', IsAuth, async (req, res) => {
    let auction = await auctionService.getOne(req.params.auctionId).lean();
    const isOwner = await auctionService.isOwner(auction, req.user?._id);

    if (!isOwner) {
        return res.redirect('/home/404');
    }

    await auctionService.delete(req.params.auctionId);

    res.redirect('/');
});

router.post('/:auctionId/bid', IsAuth, async (req, res) => {
    const newPrice = Number(req.body.newPrice);
    try {
        await auctionService.bid(req.params.auctionId, req.user, newPrice);
        res.redirect(`/auction/${req.params.auctionId}/details`);
    } catch (error) {
        console.log(error);
        res.status(400).render('auction/details', { error: getErrorMessage(error) });
    }

});

router.get('/:auctionId/edit', IsAuth, async (req, res) => {
    let auction = await auctionService.getOne(req.params.auctionId).lean();

    const category = Object.keys(categoryies).map(key => ({
        value: key,
        label: categoryies[key],
        isSelected: auction.category == key,
    }));

    res.render('auction/edit', {auction, category});
});

router.post('/:auctionId/edit', IsAuth, async (req, res) => {
    let auction = await auctionService.getOne(req.params.auctionId).lean();
    const isOwner = await auctionService.isOwner(auction, req.user?._id);

    if (!isOwner) {
        return res.redirect('/home/404');
    }
    try {
        await auctionService.update(req.params.auctionId, req.body);
        res.redirect(`/auction/${req.params.auctionId}/details`);
    } catch (error) {
        res.status(400).render('auction/edit', { error: getErrorMessage(error) });
    }

});

/*
router.get('/:auctionId/close', IsAuth, async (req, res) => {
    let auction = await auctionService.getOne(req.params.auctionId).lean();

    try {
        console.log(98)
        await auctionService.close(auction);
        res.redirect(`/auction/${req.params.auctionId}/details`);
    } catch (error) {
        res.status(400).render('auction/edit', { error: getErrorMessage(error) });
    }

});*/


module.exports = router;
