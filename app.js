const express = require("express");
const morgan = require("morgan");

const groupRouter = require("./routes/groupRoutes");
const userRouter = require("./routes/userRoutes");

/* ------------------------------- middlewares ------------------------------ */
const app = express();
if (process.env.NODE_ENV === "development") {
  console.log("------development env-----");
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  console.log("------production env-----");
}

app.use(express.json());

/* ----------------------------- static webpages ---------------------------- */
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/node_modules/bootstrap/dist`));

/* --------------------------------- routes --------------------------------- */
app.use("/api/v1/groups", groupRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
