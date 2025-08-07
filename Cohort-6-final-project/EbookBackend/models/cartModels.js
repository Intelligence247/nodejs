const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    unique: true,
  },
  cartList: {
    type: Array,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
