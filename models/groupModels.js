const mongoose = require("mongoose");

const groupScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 4,
      maxlength: 15,
      required: [true, "group must have a name"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [115, "description must be less than 115 character"],
      validate: function (val) {
        return val.length >= 0;
      },
      default: null,
    },
    admin: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "group must have an admin"],
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    groupHistory: [
      {
        inDebt: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        inDebtTo: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        amount: Number,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
groupScheme.virtual("records", {
  ref: "Record",
  foreignField: "group",
  localField: "_id",
});
groupScheme.virtual("membersCount").get(function () {
  return this.members.length;
});
groupScheme.pre("save", function (next) {
  if (this.isNew) {
    this.members.push(this.admin);
  }
  next();
});
groupScheme.pre("findOne", function (next) {
  this.populate({
    path: "admin",
    select: "-__v",
  });
  this.populate({
    path: "members",
    select: "-__v",
  });
  this.populate({ path: "groupHistory", select: "-__v" });
  next();
});
const Group = mongoose.model("Group", groupScheme);
module.exports = Group;
