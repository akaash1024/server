// utils/asyncHandler.js
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    author: {
        type: String,
        required: [true, "Author name is required"]
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

// controllers/postController.js
const Post = require('../models/Post');

// Create a new blog post
const createPost = asyncHandler(async (req, res) => {
    const { title, content, author } = req.body;
    
    const post = await Post.create({
        title,
        content,
        author
    });

    res.status(201).json({
        success: true,
        post
    });
});

// Get all blog posts
const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find()
        .sort({ createdAt: -1 }); // Latest first

    res.status(200).json({
        success: true,
        count: posts.length,
        posts
    });
});

// Get single post by ID
const getPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
        throw new Error("Post not found");
    }

    res.status(200).json({
        success: true,
        post
    });
});

// Update a post
const updatePost = asyncHandler(async (req, res) => {
    let post = await Post.findById(req.params.id);
    
    if (!post) {
        throw new Error("Post not found");
    }

    post = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    res.status(200).json({
        success: true,
        post
    });
});

// Delete a post
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
        throw new Error("Post not found");
    }

    await post.remove();

    res.status(200).json({
        success: true,
        message: "Post deleted successfully"
    });
});

// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const {
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
} = require('../controllers/postController');

router.route('/')
    .get(getAllPosts)
    .post(createPost);

router.route('/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost);

module.exports = router;

// app.js
const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(express.json());
app.use('/api/posts', postRoutes);

mongoose.connect('mongodb://localhost:27017/blogDB')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});