const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const groupRouter = require("./routes/groupRoutes");
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");

const app = express();

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);
/* ------------------------------- middlewares ------------------------------ */
if (process.env.NODE_ENV === "development") {
  console.log("------development env-----");
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  console.log("------production env-----");
}

app.use(cookieParser());
app.use(express.json());
/* ----------------------------- static webpages ---------------------------- */
app.use(express.static(`${__dirname}/public`));
/* --------------------------------- routes --------------------------------- */

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

app.use("/", viewRouter);
app.use("/api/v1/groups", groupRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
