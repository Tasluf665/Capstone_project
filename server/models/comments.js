const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    pp:{
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    department: {
        type: String,
        required: true,
        enum: ['HR', 'IT', 'Finance', 'Marketing', 'Sales'],
        default: 'IT'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    comments: {
        type: [Map],
        of: String,
        required: false,
        unique: false,
        default: []
    },
    email: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;