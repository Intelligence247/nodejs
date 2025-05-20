const { add, sub, mult, div } = require("./logics.js");
const { profit } = require("./classwork.js");

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
