const mongoose = require("mongoose");

const eBookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
  },
  long_description: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
  },

  poster: {
    type: String,
  },

  rating: {
    type: Number,
    required: true,
  },

  in_stock: {
    type: Boolean,
    default: true,
  },

  size: {
    type: Number,
  },
  best_seller: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Ebook", eBookSchema);
