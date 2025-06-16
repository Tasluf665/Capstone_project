const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { jwtDecode } = require('jwt-decode');
const bcrypt = require('bcrypt');

router.post('/auth/signup', async (req, res) => {
    const { name, lastName, email, password, passwordConfirm, department } = req.body;

    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // validate password
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    if (password !== passwordConfirm) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // add user to the database
    const newUser = new User({
        name,
        lastName,
        email,
        password: hashPassword,
        department
    });
    try {
        await newUser.save();
        res.json({ message: 'User created successfully' });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Error creating user' });
    }

});

router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // find user in the database
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // send success response
    res.json({
        status: 200,
        message: 'Login successful',
        data: {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            department: user.department,
            role: user.role || 'user', // default role is 'user'
        }
    });
});

router.get('/auth/users', async (req, res) => {
    try{
        const token = jwtDecode(req.headers.authorization?.split(' ')[1]);
        const user = await User.findById(token.id);

        // Validate user an role
        if (!user) res.status(404).json({ message: 'User not found' });
        if (user.role !== 'admin') res.status(403).json({ message: 'Forbidden: Admin access required' });

        const users = await User.find({}, '-password -__v'); // Exclude password field and __v field
        res.status(200).json(users);

    }catch (error) {
        console.error('Error in /api/auth/users route:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router;
