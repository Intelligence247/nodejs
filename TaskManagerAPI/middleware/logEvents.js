const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs/promises");
const { v4: uuid } = require("uuid");
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = format(new Date(), "yyyy-MM-dd\t\tHH:mm:ss");
  const logItems = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItems);
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fs.mkdir(path.join(__dirname, "..", "logs"), (err) => {
        if (err) throw err;
        console.log("Directory Successfully Created");
      });
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItems
    );
  } catch (error) {
    console.log(error);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.path}`);

  next();
};

module.exports = { logEvents, logger };
