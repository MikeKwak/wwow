require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

// Connect Database
connectDB();

// Express session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(cors({
  origin: '*' // replace with your React app's domain in production
}));

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/reviews', require('./routes/reviewRoutes'));
// app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));
