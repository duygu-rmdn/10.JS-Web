const Auction = require('../models/Auction');

exports.create = (data) => Auction.create(data);

exports.getAll = () => Auction.find({});

exports.getOne = (auctionId) => Auction.findById(auctionId);

exports.isOwner = (auction, userId) => auction.author == userId;

exports.isBidder = (auction, userId) => auction.bidder == userId;

exports.delete = (auctionId) => Auction.findByIdAndDelete(auctionId);

exports.update = (auctionId, data) => Auction.findByIdAndUpdate(auctionId, data, {runValidators: true});

exports.bid = async (auctionId, user, newPrice) => {
    let auction = await this.getOne(auctionId);

    if(auction.price < newPrice){
        auction.price = newPrice;
        auction.bidder = user;
        await auction.save();
    } else{
        throw new Error('New price must be higher!')
    }
};

