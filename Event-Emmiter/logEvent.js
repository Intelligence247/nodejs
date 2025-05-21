const EventEmmiter = require("events");
const myEmmiter = new EventEmmiter();
const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs/promises");
const { v4: uuid } = require("uuid");
const path = require("path");

let m = 0;
myEmmiter.on("greet", (name) => {
  console.log(`Hello, ${name}`);
});

myEmmiter.on("start", (number) => {
  console.log(`Class Starts by: ${number}am`);
});

myEmmiter.on("starts", (start, end) => {
  console.log(`Number ${start} to ${end}`);
});
myEmmiter.once("event", () => {
  console.log(++m);
});

myEmmiter.on("something", async () => {
  throw new Error("Error Detected");
});

myEmmiter.emit("greet", "Alice");
myEmmiter.emit("start", 9);
myEmmiter.emit("starts", 20, 200);
myEmmiter.emit("event");
myEmmiter.on("something", console.log);

fs.writeFile("output.txt", "Hello World", (err) => {
  if (err) {
    console.error("Error writing file:", err);
  }
  console.log("File written successfully");
});

const logEvents = async (message) => {
  const dateTime = format(new Date(), "yyyy-MM-dd\t\tHH:mm:ss");
  const logItems = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItems);
  try {
    if (!fs.existsSync(path.join(__dirname, "Logs"))) {
      await fs.mkdir(path.join(__dirname, "Logs"), (err) => {
        if (err) throw err;
        console.log("Directory Successfully Created");
      });
      await fsPromises.appendFile(
        path.join(__dirname, "Logs", "eventLog.txt"),
        logItems
      );
    }
  } catch (error) {
    console.log(error);
  }
};

myEmmiter.on("Login", (user) => {
  console.log(`${user}, You successfuly Login`);
});
myEmmiter.emit("Login", "Usman");

myEmmiter.on("event", function firstListener() {
  console.log(`Hello firstListener`);
});
myEmmiter.on("event", function secondListener(arg1, arg2) {
  console.log(`Event with parameters ${arg1}, ${arg2} in second listener`);
});
myEmmiter.on("event", function thirdListener(...args) {
  const parameters = args.join(", ");
  console.log(`Events with parameters ${parameters} in third listener`);
});
myEmmiter.on("event", function MyEvenwith2Arg(name, age) {
  console.log(`My name is ${name} and I am ${age} years old`);
});

console.log(myEmmiter.listeners("event"));
myEmmiter.emit("event", "Usman", 2, 3, 4, 5);

module.exports = logEvents;
