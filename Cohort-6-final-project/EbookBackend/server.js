const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOption = require("./config/corsOption");
const userRoutes = require("./routes/userRoutes");
const ebookRoutes = require("./routes/ebookRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app = express();
app.use(cors(corsOption));
app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/ebook", ebookRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");

    app.listen(process.env.PORT || 4000, () => {
      console.log(`Connect to port ${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => {
    console.error("Database connection Error", err);
    process.exit(1);
  });

//   ABDULLAHI23USMAN

// EbookStore

//  npx json-server --watch data/db.json --port 8000
