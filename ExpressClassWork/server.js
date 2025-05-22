const EventEmmiter = require("events");
const myEmmiter = new EventEmmiter();
const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs/promises");
const { v4: uuid } = require("uuid");
const path = require("path");

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

myEmmiter.on("welcome", (name) => {
  console.log(`Welcome back, ${name}`);
});

myEmmiter.on("about", (name) => {
  console.log(`Welcome back, ${name}`);
});

myEmmiter.on("about", (name, age) => {
  console.log(`My name is ${name} and I am ${age} years old`);
});

myEmmiter.on("about", (name, age, DOB) => {
  console.log(`My name is ${name} and I am ${age} years old, bord on ${DOB}`);
});

myEmmiter.on("about", (name, age, DOB, skills) => {
  const skillSet = skills.join(" ");
  console.log(
    `My name is ${name} and I am ${age} years old, bord on ${DOB}\n Some of my skills include: ${skillSet}`
  );
});

myEmmiter.on("about", (name, age, DOB, skills, experience) => {
  const skillSet = skills.join(" ");
  console.log(
    `My name is ${name} and I am ${age} years old, bord on ${DOB}\n Some of my skills include: ${skillSet}, With over ${experience}+ years of Experience`
  );
});

myEmmiter.emit("about", "Usman", 34, "24/08/1990", ["Html", "CSS", "JavaScript", "TypeScript", "React"], 8);
