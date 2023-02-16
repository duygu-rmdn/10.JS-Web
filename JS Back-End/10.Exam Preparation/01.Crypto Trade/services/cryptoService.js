const Crypto = require('../models/Crypto');

exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.getAll = () => Crypto.find().lean();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).populate('buyers');

exports.isBuyer = (crypto, currUserId) => crypto.buyers?.some(x => x._id == currUserId);

exports.update = (cryptoId, data) => Crypto.findByIdAndUpdate(cryptoId, data, { runValidators: true });

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.search = async (name, payment) => {
    let crypto = await this.getAll();
    
    if (name) {
        crypto = crypto.filter(x => x.name.toLowerCase() == name);
    }

    if (payment) {
        crypto = crypto.filter(a => a.payment == payment);
    }
    return crypto;
}
