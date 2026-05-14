{/*
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const mailRoutes = require("./routes/mailRoutes");

require("dotenv").config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", mailRoutes);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/class", require("./routes/class"));
app.use("/api/teacher", require("./routes/teacher"));
app.use("/api/subject", require("./routes/subject"));
app.use("/api/question", require("./routes/question"));
app.use("/api/generate", require("./routes/generate"));
app.use("/api/report", require("./routes/report"));
app.use("/api/admin", require("./routes/admin"));

app.use("/papers", express.static(path.join(__dirname, "papers")));

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});

*/}

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const mailRoutes = require("./routes/mailRoutes");

require("dotenv").config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", mailRoutes);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/class", require("./routes/class"));
app.use("/api/teacher", require("./routes/teacher"));
app.use("/api/subject", require("./routes/subject"));
app.use("/api/question", require("./routes/question"));
app.use("/api/generate", require("./routes/generate"));
app.use("/api/report", require("./routes/report"));
app.use("/api/admin", require("./routes/admin"));

app.use("/papers", express.static(path.join(__dirname, "papers")));

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
  console.log(process.env.MONGO_URI);
});