const whiteList = [
  "https://www.yourdomain.com",
  "http://127.0.0.5500",
  "http://localhost:4000",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by Cors"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = { corsOptions };
