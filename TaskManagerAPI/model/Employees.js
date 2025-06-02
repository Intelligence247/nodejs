const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeesSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("employees", employeesSchema);
