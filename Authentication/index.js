const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOption");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");

// Built in middleware to handle urlencoded data
// in other word form data


const PORT = 4000;


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

app.listen(4000, () => {
  console.log(`Server running on ${PORT}`);
});
