const mongoose = require("mongoose");

const recordScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 30,
      required: [true, "record must have a name"],
    },
    addByWho: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "group must have an admin"],
    },
    inDebtMembers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    amount: {
      type: Number,
      required: [true, "record must have a name"],
    },
    group: {
      type: mongoose.Schema.ObjectId,
      ref: "Group",
      required: [true, "record must belong to a group."],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Record = mongoose.model("Record", recordScheme);
module.exports = Record;
