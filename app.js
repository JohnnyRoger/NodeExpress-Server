const express = require("express");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const WebRoutes = require("./routes/web");
const { connect } = require("./config/database");
const cors = require("cors");
const logger = require("./utils/logger");
require("dotenv").config();
const authController = require("./authController");

//* express app
const app = express();
const port = process.env.APP_PORT;
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// routes
app.post("/register", authController.register);
app.post("/login", authController.login);

// start
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
