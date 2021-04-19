const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./db/db");

connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {});

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});
