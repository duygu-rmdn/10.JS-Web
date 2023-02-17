const Book = require('../models/Book');

exports.create = (datas) => Book.create(datas);

exports.getAll = () => Book.find();

exports.getOne = (bookId) => Book.findById(bookId).populate('wishings');

exports.update = (bookId, data) => Book.findByIdAndUpdate(bookId, data, { runValidators: true });

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

exports.isOwner = (owner, user) => owner == user;

exports.isWisher = (book, wisher) => book.wishings?.some(x => x._id == wisher);

exports.getUsersBooks = async (userId) => {
    let books = await this.getAll().lean();
    books = books.filter(x => x.wishings.some(x =>x._id == userId));

    return books;
}
