const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user must have a name"],
  },
  email: {
    type: String,
    required: [true, "user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 8,
    select: false,
  },
});

userScheme.pre("save", async function (next) {
  // only if the password field is modified encrypt user password
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});
userScheme.methods.correctPassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model("User", userScheme);
module.exports = User;
