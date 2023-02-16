const { IsAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const cryptoService = require('../services/cryptoService');
const { checkIsOwner } = require('../middlewares/cryptoMiddleware');
const { paymentMethods } = require('../constants');

const router = require('express').Router();

router.get('/create', IsAuth, (req, res) => {
    res.render('crypto/create');
});

router.post('/create', IsAuth, async (req, res) => {
    try {
        const crypto = await cryptoService.create({ ...req.body, owner: req.user._id });
        res.redirect('/crypto/catalog');
    } catch (error) {
        console.log(error);
        res.status(400).render('crypto/create', { error: getErrorMessage(error) });
    }
});

router.get('/catalog', async (req, res) => {
    let crypto = await cryptoService.getAll();
    res.render('crypto/catalog', { crypto });
});

router.get('/:cryptoId/details', async (req, res) => {
    const currUserId = req.user?._id;
    const crypto = await cryptoService.getOne(req.params.cryptoId).lean();

    const isOwner = currUserId == crypto.owner;
    const isBuyer = await cryptoService.isBuyer(crypto, currUserId);

    res.render('crypto/details', { crypto, isOwner, isBuyer });
});

router.get('/:cryptoId/buy', IsAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId
    let crypto = await cryptoService.getOne(cryptoId);
    crypto.buyers.push(req.user._id);
    await crypto.save();

    res.redirect(`/crypto/${cryptoId}/details`);
});

router.get('/:cryptoId/edit', checkIsOwner, async (req, res) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId).lean();

    const paymentMeth = Object.keys(paymentMethods).map(key => ({
        value: key,
        label: paymentMethods[key],
        isSelected: crypto.payment == key,
    }));

    res.render('crypto/edit', { crypto, paymentMeth });
});

router.post('/:cryptoId/edit', checkIsOwner, async (req, res) => {
    try {
        await cryptoService.update(req.params.cryptoId, req.body);
        res.redirect(`/crypto/${req.params.cryptoId}/details`);
    } catch (error) {
        res.status(400).render('crypto/create', { error: getErrorMessage(error) });
    }
});

router.get('/:cryptoId/delete', checkIsOwner, async (req, res) => {
    await cryptoService.delete(req.params.cryptoId);
    res.redirect('/crypto/catalog');
});

router.get('/search', async (req, res) => {
    const { name, payment } = req.query;
    const crypto = await cryptoService.search(name, payment);


    res.render('crypto/search', { crypto });
});

module.exports = router;

