const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  // roles: { type: Number, default: 2001 },

  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
    AdminOfAdmin: Number,
  },
  password: {
    type: String,
    require: true,
  },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
