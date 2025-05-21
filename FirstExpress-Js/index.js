const express = require("express");
const app = express();
const path = require("path");

app.get("/Data.json", (req, res) => {
  res.sendFile(path.join(__dirname, "Data", "Data.json"));
});

const PORT = 4000;

app.listen(4000, () => {
  console.log(`Server running on ${PORT}`);
});
