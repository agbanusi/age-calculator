const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 3, // limit to 3 calls per second
  message: { message: "Too many calls, wait a few moments and try again" },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

app.get("/howold", ageLimiter, (req, res) => {
  try {
    const { dob } = req.query;
    if (!dob || isNaN(dob)) {
      return res.status(400).json({ message: "invalid query input" });
    }
    const now = Date.now();
    const diff = now - dob;

    if (diff < 0) {
      return res
        .status(400)
        .json({ message: "Invalid query input as age cannot be negative" });
    }
    const year = 1000 * 3600 * 24 * 365.25; //one year = 365 + 1/4 days
    const age = diff / year;

    return res.json({ age: Math.floor(age), message: "successful" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
