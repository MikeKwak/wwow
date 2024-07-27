const mongoose = require('mongoose');
const User = require('./models/user');
const Manufacturer = require('./models/manufacturer');
const Product = require('./models/product');
const Review = require('./models/review');
const Favourite = require('./models/favourite');

// Sample data
const users = [
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dateOfBirth: new Date('1990-01-01'), password: 'password123', status: 'active' },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', dateOfBirth: new Date('1985-05-15'), password: 'password123', status: 'active' },
    { firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', dateOfBirth: new Date('1992-08-23'), password: 'password123', status: 'active' },
    { firstName: 'Bob', lastName: 'Brown', email: 'bob.brown@example.com', dateOfBirth: new Date('1978-04-12'), password: 'password123', status: 'inactive' }
];

const manufacturers = [
    { name: 'Manufacturer A', country: 'USA' },
    { name: 'Manufacturer B', country: 'Canada' },
    { name: 'Manufacturer C', country: 'Germany' }
];

const products = [
    { name: 'Product 1', type: 'Type A', manufacturer: null, price: 100.00, description: 'Description for Product 1' },
    { name: 'Product 2', type: 'Type B', manufacturer: null, price: 200.00, description: 'Description for Product 2' },
    { name: 'Product 3', type: 'Type C', manufacturer: null, price: 150.00, description: 'Description for Product 3' }
];

const reviews = [
    { user: null, product: null, rating: 5, comments: 'Great product!', reviewDate: new Date() },
    { user: null, product: null, rating: 4, comments: 'Very good!', reviewDate: new Date() },
    { user: null, product: null, rating: 3, comments: 'It\'s okay.', reviewDate: new Date() }
];

const favourites = [
    { user: null, product: null, favoriteDate: new Date() },
    { user: null, product: null, favoriteDate: new Date() }
];

// MongoDB connection
mongoose.connect('mongodb+srv://admin:gasdCom3JCSDgf6f@cluster0.yt0sid1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useUnifiedTopology: true,
});

const db = mongoose.connection;

const seedDatabase = async () => {
    try {
        await db.once('open', async () => {
            console.log('Connected to MongoDB');

            // Clear existing data
            await User.deleteMany({});
            await Manufacturer.deleteMany({});
            await Product.deleteMany({});
            await Review.deleteMany({});
            await Favourite.deleteMany({});

            // Insert sample data
            const userDocs = await User.insertMany(users);
            const manufacturerDocs = await Manufacturer.insertMany(manufacturers);

            // Link manufacturers to products
            products[0].manufacturer = manufacturerDocs[0]._id;
            products[1].manufacturer = manufacturerDocs[1]._id;
            products[2].manufacturer = manufacturerDocs[2]._id;
            const productDocs = await Product.insertMany(products);

            // Link users and products to reviews and favourites
            reviews[0].user = userDocs[0]._id;
            reviews[0].product = productDocs[0]._id;
            reviews[1].user = userDocs[1]._id;
            reviews[1].product = productDocs[1]._id;
            reviews[2].user = userDocs[2]._id;
            reviews[2].product = productDocs[2]._id;
            await Review.insertMany(reviews);

            favourites[0].user = userDocs[0]._id;
            favourites[0].product = productDocs[1]._id;
            favourites[1].user = userDocs[1]._id;
            favourites[1].product = productDocs[2]._id;
            await Favourite.insertMany(favourites);

            console.log('Sample data inserted');
            db.close();
        });
    } catch (err) {
        console.error('Error seeding database:', err);
        db.close();
    }
};

seedDatabase();
