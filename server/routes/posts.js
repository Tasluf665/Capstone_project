const express = require('express');
const {jwtDecode } = require('jwt-decode');
const router = express.Router();
const User = require('../models/user'); // Adjust the path as necessary
const Post = require('../models/post'); // Assuming you have a Post model

// convert string to ObjectId
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;


router.post('/', async (req, res) => {
    try{
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decodedToken = jwtDecode(token);
        if (!decodedToken || !decodedToken.id) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // search for the user in the database
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new post
        const newPost = new Post({
            uid: user._id,
            pp: user.photo || 'https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg',
            name: user.name,
            last_name: user.lastName,
            project: req.body.project || 'random',
            department: user.department || 'General',
            title: req.body.title,
            content: req.body.content,
            likes: [],
            comments: [],
            videos: req.body.videos || [],
            images: req.body.images || [],
            timestamp: new Date(),
        });
        await newPost.save();

        res.status(200).json({
            message: 'Social media API is working!',
            postId: newPost._id,
            department: newPost.department,
        });

    }catch (error) {
        console.error('Error in /api/social route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ timestamp: -1 })
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// delete a post by id
router.delete('/:id', async (req, res) => {
    try {
        const postId = new ObjectId(req.params.id);

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user is authorized to delete the post
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const requester = await User.findById(jwtDecode(token).id)

        const decodedToken = jwtDecode(token);
        if (decodedToken.id !== post.uid.toString() && requester.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await Post.findByIdAndDelete(postId);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Like/unlike a post
router.post('/like/:id', async (req, res) => {
    try {
        const postId = new ObjectId(req.params.id);
        const token = req.headers.authorization?.split(' ')[1];
        const userId = jwtDecode(token).id;

        if(!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user has already liked the post
        if (post.likes.some(like => like.get('uid') === userId)) {
            post.likes = post.likes.filter(like => like.get('uid') !== userId);
            post.likesCount = (post.likesCount || 0) - 1;
            await post.save();
            return res.status(200).json({ message: 'Post unliked successfully', likesCount: post.likesCount });
        }

        post.likes.push({uid: userId})
        post.likesCount = (post.likesCount || 0) + 1;
        await post.save();

        res.status(200).json({ message: 'Post liked successfully', likesCount: post.likesCount });

    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Add a comment to a post
router.post('/comment/:id', async (req, res) => {
    try {
        const postId = new ObjectId(req.params.id);
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const user = await User.findById(new ObjectId(userId));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const commentId = new ObjectId();

        // Create a new comment
        const comment = {
            uid: userId,
            pp: user.photo || 'https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg',
            name: user.name,
            last_name: user.lastName,
            department: user.department || 'IT',
            timestamp: new Date(),
            content: req.body.content,
            email: user.email,
            _id: commentId
        };

        post.comments.push(comment);
        await post.save();


        res.status(200).json({ message: 'Comment added successfully', commentId, department: user.department || 'IT' });
  
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// delete a comment by id
router.delete('/comment/:postId/:commentId', async (req, res) => {
    try {
        const postId = new ObjectId(req.params.postId);
        const commentId = new ObjectId(req.params.commentId);
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const requester = await User.findById(decodedToken.id)

        // Find the comment to delete
        const commentIndex = post.comments.findIndex(comment => comment.get('_id').toString() === commentId.toString() && comment.get('uid') === userId.toString());
        if (commentIndex === -1 && requester.role !== 'admin') {
            return res.status(404).json({ message: 'Comment not found or unauthorized' });
        }
        // Remove the comment from the post
        post.comments.splice(commentIndex, 1);
        await post.save();


        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;