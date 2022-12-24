const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.search = catchAsync(async (req, res) => {
  const queryObj = { ...req.query };
  const users = await User.find({
    $text: { $search: queryObj.input },
  }).select("-__v -_id");
  res.status(200).json({
    status: "success",
    data: {
      users: users,
    },
  });
});
exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};
