const { add, sub, mult, div } = require("./logics.js");
const { profit } = require("./classwork.js");
const fs = require("fs");

const { createServer } = require("http");
// const http = require("http");
// console.log(http.STATUS_CODES);

const math = (a, b) => {
  const addResult = add(a, b);
  const subResult = sub(a, b);
  const multResult = mult(a, b);
  const divResult = div(a, b);
  return {
    addResult,
    subResult,
    multResult,
    divResult,
  };
};

const result = math(10, 5);

const finalResult = { ...result, profit: profit(10, 50) };

fs.writeFile("output.txt", "Hello World", (err) => {
  if (err) {
    console.error("Error writing file:", err);
  }
  console.log("File written successfully");
});

fs.appendFile("output.txt", "This is my world", (err) => {
  if (err) {
    console.err("Error appending file", err);
    return;
  }
  console.log("Content appended succefully");
});

fs.readFile("output.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file", err);
    return;
  }
  console.log("File Content:", data);
});

fs.open("NewFile.txt", "wx", (err, fd) => {
  if (err) {
    if (err.code == "EEXIST") {
      console.error("File already exist");
    } else {
      console.error("Error:", err);
    }
    fs.write(fd, "initiaal contnet", (err) => {
      if (err) console.error("Write error:", err);
      fs.close(fd, () => console.log("file created and written succcesfully"));
    });
  }
});

const server = createServer((req, res) => {
  (res.statusCode = 200),
    res.setHeader("content-type", "text/plain"),
    res.end(`Here is your result: ${JSON.stringify(finalResult)},`);
});

const hostname = "localhost";

const port = 3000;
server.listen(port, hostname, () => {
  console.log(`server running at port ${port}`);
});
