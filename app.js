const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const groupRouter = require("./routes/groupRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);
// app.get("/", (req, res) => {
//   res.status(200).render("base", {
//     title: "my profile",
//     user: "peter nady",
//   });
// });
/* ------------------------------- middlewares ------------------------------ */
if (process.env.NODE_ENV === "development") {
  console.log("------development env-----");
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  console.log("------production env-----");
}

app.use(express.json());
/* ----------------------------- static webpages ---------------------------- */
app.use(express.static(`${__dirname}/public`));
/* --------------------------------- routes --------------------------------- */

app.use("/api/v1/groups", groupRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
