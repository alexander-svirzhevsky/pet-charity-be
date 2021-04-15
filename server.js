const express = require("express");
const app = express();
const PORT = 5000;
const connectDB = require("./db/db");

connectDB();

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});
