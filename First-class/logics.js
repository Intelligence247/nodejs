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
const profit = (cost, sellingPrice) => {
 const  profits = sellingPrice - cost;
  const loss = cost - sellingPrice;
  if (profit > loss) {
    return `you are on a profit of: ${profits}`;
  } else {
    return `you are on a loss of: ${loss}`;
  }
};
module.exports = {
  add,
  sub,
  mult,
  div,
  profit,
};
