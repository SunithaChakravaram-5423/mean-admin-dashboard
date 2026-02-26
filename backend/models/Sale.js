const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  month: { type: String, required: true },
  amount: { type: Number, required: true },
  year: { type: Number, required: true }
});

module.exports = mongoose.model('Sale', saleSchema);
