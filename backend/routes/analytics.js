const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Sale = require('../models/Sale');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Get dashboard analytics (admin only)
router.get('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: 'admin' });
    const userCount = await User.countDocuments({ role: 'user' });

    // New signups in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newSignups = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    // Sales data
    const sales = await Sale.find({ year: 2024 }).sort({ _id: 1 });
    const totalSales = sales.reduce((sum, s) => sum + s.amount, 0);

    res.json({
      totalUsers,
      totalSales,
      newSignups,
      roleCounts: {
        admin: adminCount,
        user: userCount
      },
      monthlySales: sales.map(s => ({
        month: s.month,
        amount: s.amount
      }))
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;