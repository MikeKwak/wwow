const Product = require('../models/product');
const Review = require('../models/review');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, manufacturer } = req.body;
    const newProduct = new Product({
      name,
      description,
      manufacturer
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProductByName = async (req, res) => {
  try {
    const productName = req.params.name;
    const product = await Product.findOne({ productName: productName });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getReviewsByProduct = async (req, res) => {
  try {
    const productName = req.params.productName;
     
    console.log(req.params.productName)

    // Fetch all reviews for the product
    const reviews = await Review.find({ productName });

    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add more functions as needed for update, delete, etc.
