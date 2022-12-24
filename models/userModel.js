const fs = require("fs");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const profilesFolder = `${__dirname}/../public/images/profiles`;

const imagesPath = fs
  .readdirSync(profilesFolder)
  .map((file) =>
    profilesFolder.replace(`${__dirname}/../public/`, "").concat("/", file)
  );

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
  photo: {
    type: String,
    // default: function () {
    //   return imagesPath[Math.floor(Math.random() * imagesPath.length)];
    // },
  },
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
userScheme.pre("save", function (next) {
  this.photo = imagesPath[Math.floor(Math.random() * imagesPath.length)];
  next();
});
userScheme.methods.correctPassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};
userScheme.index({ email: "text" });
const User = mongoose.model("User", userScheme);
module.exports = User;
