require("colors");
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const passport = require("passport");

const { logger, logEvents } = require("./middleware/logger");
const {
  googleAuthStrategy,
  githubAuthStrategy,
} = require("./middleware/passport");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");

// Configure HTTPS options
const httpsOptions = {
  key: fs.readFileSync("./certificates/private-key.pem"),
  cert: fs.readFileSync("./certificates/certificate.pem"),
};

const app = express();
const server = https.createServer(httpsOptions, app);

const PORT = process.env.PORT || 5000;

console.log(process.env.NODE_ENV);

connectDB();

app.use(helmet());

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(passport.initialize());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/notes", require("./routes/noteRoutes"));

// Configure Google/GitHub Strategy
passport.use(googleAuthStrategy);
passport.use(githubAuthStrategy);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log(`MongoDB connected at ${mongoose.connection.host} on port ${mongoose.connection.port}`.yellow);
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
