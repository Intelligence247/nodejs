const add = (a, b) => {
  return a + b;
};

const sub = (a, b) => {
  return a >= b ? a - b : b - a;
};

const mult = (a, b) => {
  return a * b;
};

const div = (a, b) => {
  return a / b;
};

module.exports = {
  add,
  sub,
  mult,
  div,
};
