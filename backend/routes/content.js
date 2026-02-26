const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Get all content
router.get('/', verifyToken, async (req, res) => {
  try {
    const content = await Content.find().sort({ createdAt: -1 });
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add content (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description required' });
    }
    const content = new Content({ title, description });
    await content.save();
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete content (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ message: 'Content deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
