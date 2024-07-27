const Review = require('../models/review');
const Product = require('../models/product');

exports.createReview = async (req, res) => {
  try {
    const { productName, email, imgUrl, rating, comments } = req.body;

    // Check if the product exists by name
    const product = await Product.findOne({ productName: productName });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create a new review
    const newReview = new Review({
      productName,
      email,
      imgUrl,
      rating,
      comments
    });

    // Save the review
    const review = await newReview.save();

    // Optionally, if you still want to keep reviews in the product document
    product.reviews.push(review._id);
    await product.save();

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.test = async (req, res) => {
  try {
    console.log("test");

    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
