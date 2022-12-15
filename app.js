const express = require("express");
const morgan = require("morgan");

/* ------------------------------- middlewares ------------------------------ */
const app = express();
if (process.env.NODE_ENV === "development") {
  console.log("------development env-----");
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  console.log("------production env-----");
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/node_modules/bootstrap/dist`));

module.exports = app;
