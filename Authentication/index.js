const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOption");
const cookieParser = require("cookie-parser");
// Built in middleware to handle urlencoded data
// in other word form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// built in middleware for jsoon
// app.use(express.json());

// Custom middleware logger
app.use(logger);
// Third party middleware
// cross origin resource sharing

app.use(cors(corsOptions));

app.use(errHandler);
// Serve static files
app.use(express.static(path.join(__dirname, "/public")));

app.get("/Data.json", (req, res) => {
  res.sendFile(path.join(__dirname, "Data", "Data.json"));
});

app.get("/Student.json", (req, res) => {
  res.sendFile(path.join(__dirname, "Student", "Student.json"));
  console.log(res);
});

const PORT = 4000;

app.use("/", require("./routes/root"));
app.use("/Subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));
app.use("/users", require("./routes/userRoute"));

app.listen(4000, () => {
  console.log(`Server running on ${PORT}`);
});
