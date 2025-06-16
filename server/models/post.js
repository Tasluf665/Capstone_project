const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
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
    project: {
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
    title: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    content: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    videos: {
        type: [String],
        required: false,
        unique: false,
        trim: true
    },
    images: {
        type: [String],
        required: false,
        unique: false,
        trim: true
    },
    likes: {
        type: [Map],
        of: String,
        required: false,
        unique: false,
        default: []
    },
    likesCount: {
        type: Number,
        default: 0,
        required: false,
        unique: false
    },
    comments: {
        type: [Map],
        of: String,
        required: false,
        unique: false,
        default: []
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;