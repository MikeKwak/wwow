const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    supplierSku: { type: String, required: false },
    productClassification: { type: String, required: true },
    marketPrice: { type: Number, required: false },
    description: { type: String, required: false },
    qrCode: { type: Buffer, required: false },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
