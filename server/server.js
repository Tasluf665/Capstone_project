const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const passportConfig = require('./config/passport');
const sessionConfig = require('./config/sessionConfig');
const authRoutes = require('./routes/authRoutes');
const backlogRoutes = require('./routes/backlogRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

app.set('trust proxy', 1);

// CORS setup
const allowedOrigins = [
    process.env.FRONTEND_URL, // https://capstone-project-tan-gamma.vercel.app
    'http://localhost:3000', // For local testing
    'http://localhost:3001', // For local testing
    'http://localhost:3002', // For local testing
    'http://localhost:3003', // For local testing
];

app.use(cors({
    origin: (origin, callback) => {
        console.log('Request Origin:', origin);
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session(sessionConfig));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);        // Routes for authentication
app.use("/api/backlog", backlogRoutes);     // Routes for fetching backlog
app.use("/api/dashboard", dashboardRoutes);

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
