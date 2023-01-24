const db = require('../db.json')

exports.getHomePage = (req, res) => {
    res.render('index', { cubes: db.cubes });
};

exports.getAboutPage = (req, res) => {
    res.render('about');
};

exports.getNotFoundPage = (req, res) => {
    res.render('404');
};