const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // TODO return a user friendly message if the user is already exits
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password actually exists
  if (!email || !password) {
    return next(new AppError("please provide email and password", 400));
  }
  // check if the user exists && password is correct
  const user = await User.findOne({ email }).select("password");
  const correctPassword = await user.correctPassword(password);

  if (!user || !correctPassword) {
    return next(new AppError("incorrect email or password", 401));
  }
  // if everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  console.log("object");
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  // getting token and check if it's exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.replace("Bearer ", "");
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("you are not logged in! please log in to get access", 401)
    );
  }
  // verification token
  const decodedPayload = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  // check if user still exists
  const selectedUser = await User.findById(decodedPayload.id);
  if (!selectedUser) {
    return next(
      new AppError("the user belonging to this token no longer exist", 401)
    );
  }
  // grant access to protected route
  res.locals.user = selectedUser;
  req.user = selectedUser;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  // getting token and check if it's exists
  let token;
  if (req.cookies.jwt) {
    try {
      token = req.cookies.jwt;
      // verification token
      const decodedPayload = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      // check if user still exists
      const selectedUser = await User.findById(decodedPayload.id);
      if (!selectedUser) {
        return next();
      }
      // grant access to protected route
      res.locals.user = selectedUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};
