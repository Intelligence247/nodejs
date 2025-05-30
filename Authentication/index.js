const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOption");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
// Built in middleware to handle urlencoded data
// in other word form data

// File structures: MVC (Model, View, Controller) other include Utils, 
// Services: for function doing specific task taht would needed in different places
// Middelware: errorHandler 

const PORT = 4000;

// connect to Mongodb
connectDB();

// Custom middleware logger
app.use(logger);

// Third party middleware
// cross origin resource sharing

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// built in middleware for jsoon
// app.use(express.json());

// Serve static files

app.use("/", require("./routes/root"));
app.use("/Subdir", require("./routes/subdir"));
app.use("/users", require("./routes/userRoute"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);

app.use("/employees", require("./routes/api/employees"));
app.use(errHandler);

mongoose.connection.once("open", () => {
  console.log("connect to mongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});
