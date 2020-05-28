"use strict";
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
var bodyParser = require("body-parser");

const configurePassport = require("./configurePassport.js");
const passportRouter = require("./routes/passport");

const usersRouter = require("./routes/users");
const habitsRouter = require("./routes/habits");
const recordsRouter = require("./routes/records");

const app = express();

// view engine none: React

app.use(logger("dev"));
app.use(bodyParser.json({
  extended: true,
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: "50mb"
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front/build")));

configurePassport(app);

app.use("/users", usersRouter);
app.use("/habits", habitsRouter);
app.use("/records", recordsRouter);

app.use("/auth", passportRouter);
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/front/build/index.html"));
});


module.exports = app;
