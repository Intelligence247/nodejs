const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logoutSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Logout", logoutSchema);
