const logEvent = require("./logEvent");

const EventEmmiter = require("events");

const myEmmiter = new EventEmmiter();

myEmmiter.on("log", (msg) => logEvent(msg));

setTimeout(() => {
  myEmmiter.emit("log", "Events Emmited");
}, 2000);
