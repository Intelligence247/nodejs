const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: Object,
  },
  quantity: {
    type: Number,
  },
  amount_paid: {
    type: Number,
  },
  cartList: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Orders", orderSchema);
