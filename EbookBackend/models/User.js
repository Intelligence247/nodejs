const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please add an email"],
    trim: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
  },
  password: {
    type: String,
    required: [true, "please input a password"],
  },
  name: {
    type: String,
    required: true,
  },
  cartList: {
    type: Array,
  },
  orderList: {
    type: Array,
  },
});

module.exports = mongoose.model("Users", userSchema);