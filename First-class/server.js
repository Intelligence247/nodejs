const { add, sub, mult, div } = require("./logics.js");

const math = (a, b) => {
  const addResult = add(a, b);
  const subResult = sub(a, b);
  const multResult = mult(a, b);
  const divResult = div(a, b);
  console.log({
    addResult,
    subResult,
    multResult,
    divResult,
  });
};

math(10, 5);
