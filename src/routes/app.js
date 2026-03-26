require("dotenv").config();

const express = require("express");
const cors = require("cors");
const errorMiddleware = require("../middleware/error.middleware");
const api = require("./api");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);

app.use(api);

app.use(errorMiddleware);

module.exports = app;
