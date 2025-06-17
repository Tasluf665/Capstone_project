const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        // required: true   // Uncomment if you want password to be required
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    department: {
        type: String,
        required: true,
        enum: ['HR', 'IT', 'Finance', 'Marketing', 'Sales'],
        default: 'IT'
    },
    googleId: {
        type: String,
        allowNull: true,
    },
    photo: {
        type: String,
        allowNull: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;