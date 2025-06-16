require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const passportConfig = require('./config/passport');
const sessionConfig = require('./config/sessionConfig');
const authRoutes = require('./routes/authRoutes');
const backlogRoutes = require('./routes/backlogRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const socialRoutes = require('./routes/posts');
const systemRoutes = require('./routes/system'); // Import system routes if needed
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
app.use("/api/project", projectRoutes);
app.use("/api/user", userRoutes);
app.use("/api/social", socialRoutes); // Social media routes
app.use("/api/system", systemRoutes); // System routes (if needed)

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});


//! NOTA: Modificar manualmente el rol de los usuarios que necesiten ser admins en la DB.

/*
Esto fue una actualización para que todos los usuarios tengan el rol de "user" en la base de datos, solo se debe ejecutar una vez, no es necesario tenerlo en producción ya que este endpoint solo actualizo los usuarios viejos, los nuevos usuarios se crean con el rol de "user" por defecto.


const User = require('./models/user');
app.get("/sys/root", async (req, res) => {
   //set all users role to "user"
    try {
        await User.updateMany({}, { role: 'user' });


    } catch (error) {
        console.error('Error updating user roles:', error);
        return res.status(500).json({ message: 'Error updating user roles' });
    }
    res.json({ message: 'All users have been set to role "user"' });
});*/

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
