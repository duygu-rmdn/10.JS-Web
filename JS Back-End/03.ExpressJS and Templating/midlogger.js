module.exports = (req, res, next) => {
    console.log(`Request sent by - url: ${req.url}, method: ${req.method}.`);
    next();
}