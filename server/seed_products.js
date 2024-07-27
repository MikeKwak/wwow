const mongoose = require('mongoose');
const Product = require('./models/product');
const User = require('./models/user');
const Review = require('./models/review');
const products = require('./updated_products.json');

// MongoDB connection
mongoose.connect('mongodb+srv://admin:gasdCom3JCSDgf6f@cluster0.yt0sid1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Function to clear existing data and seed new data
async function updateSchema() {
    try {
        // Clear existing data (optional, depends on your requirements)
        await Product.deleteMany({});
        await User.deleteMany({});
        await Review.deleteMany({});
        console.log('Cleared existing data');

        // Seed new product data
        await Product.insertMany(products);
        console.log('Seeded new products data');

        // Add additional seeding or schema updates as needed
        // Example: Seed users or reviews if you have JSON files for them
        // const users = require('./updated_users.json');
        // await User.insertMany(users);
        // console.log('Seeded new users data');

        // const reviews = require('./updated_reviews.json');
        // await Review.insertMany(reviews);
        // console.log('Seeded new reviews data');
        
    } catch (err) {
        console.error('Error updating schema', err);
    } finally {
        mongoose.connection.close();
    }
}

updateSchema();
