const profit = (cost, sellingPrice) => {
  const profit = sellingPrice - cost;
  const loss = cost - sellingPrice;
  if (profit > loss) {
    return `you are on a profit`;
  } else {
    return `you are on a loss`;
  }
};

module.exports = { profit };
