const mongoose = require("mongoose");
const usermodel = require("./User");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose,
    ref: "User",
  },
  cartList: {
    type: Array,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
