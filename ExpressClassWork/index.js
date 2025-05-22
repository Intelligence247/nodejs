const express = require("express");
const app = express();
const path = require("path");
const server = require("./server");
const fs = require("fs");

const EventEmmiter = require("events");

const myEmmiter = new EventEmmiter();

myEmmiter.on("log", (msg) => logEvent(msg));

setTimeout(() => {
  myEmmiter.emit("log", "Events Emmited");
}, 2000);

const PORT = 6000;

app.get("/MyData.json", (req, res) => {
  res.sendFile(path.join(__dirname, "MyData", "MyData.json"));
});

app.get("/index.html", (res, req) => {
  res.sendFile(path.join(__dirname, "Views", "index.html"));
});

app.listen(6000, () => {
  console.log(`You are running on port ${PORT}`);
});
fs.mkdir(path.join(__dirname, "New Folder"), (err) => {
  if (err) {
    console.log("Error while creating new folder");
  }
  console.log("New Folder Created Successfully");
});

fs.writeFile("File.txt", "Help me ", (err) => {
  if (err) {
    console.log("Error right here");
  }
  console.log("Created successfully");
});

fs.writeFile("./Views/File.txt", "Inside Folder File Creation", (err) => {
  if (err) {
    console.log("Error right here");
  }
  console.log("Created successfully");
});
