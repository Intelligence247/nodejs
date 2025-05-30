const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.DATABASE_URI, {
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    // });
    await mongoose.connect(process.env.DATABASE_URI)
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;