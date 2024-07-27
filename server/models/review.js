const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    email: { type: String, required: true },
    imgUrl: { type: String, required: false },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comments: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
