require("express-async-errors");
const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/errorHandling");
const connectDB = require("./db/db");

connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {});

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/typeOfAnimal", require("./routes/api/typeOfAnimal"));
app.use("/api/animal", require("./routes/api/animal"));
app.use("/api/breed", require("./routes/api/breed"));

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server starting on port ${PORT}`);
});
