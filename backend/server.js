  require('dotenv').config();
  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');

  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/users', require('./routes/users'));
  app.use('/api/content', require('./routes/content'));
  app.use('/api/analytics', require('./routes/analytics'));

  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB connected');
      seedData();
    })
    .catch(err => console.error('MongoDB error:', err));

  // Seed some dummy data
  async function seedData() {
    const Sale = require('./models/Sale');
    const count = await Sale.countDocuments();
    if (count === 0) {
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const sales = months.map((month, i) => ({
        month,
        amount: Math.floor(Math.random() * 9000) + 1000,
        year: 2024
      }));
      await Sale.insertMany(sales);
      console.log('Dummy sales data seeded');
    }
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
