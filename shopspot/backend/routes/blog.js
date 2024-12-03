const express = require('express');
const BlogPost = require('../models/BlogPost');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find().populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// Get details of a single blog post
router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
});

// Create a new blog post
router.post('/', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new BlogPost({ title, content, author: req.user });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
});

// Update an existing blog post
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await BlogPost.findOneAndUpdate(
      { _id: req.params.id, author: req.user }, // Use req.user to check if the author matches
      { title, content },
      { new: true }
    );

    if (!post) return res.status(404).json({ message: 'Post not found or unauthorized' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
});

// Delete a blog post
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await BlogPost.findOneAndDelete({ _id: req.params.id, author: req.user }); // Use req.user for authorization
    if (!post) return res.status(404).json({ message: 'Post not found or unauthorized' });
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
});

module.exports = router;
