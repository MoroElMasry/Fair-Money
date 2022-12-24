const { string } = require("i/lib/util");
const mongoose = require("mongoose");

const groupScheme = new mongoose.Schema(
  {
    name: {
      type: string,
      trim: true,
      minlength: 4,
      maxlength: 15,
      required: [true, "group must have a name"],
    },
    description: {
      type: string,
      trim: true,
      maxlength: [115, "description must be less than 115 character"],
      validate: function (val) {
        return val.length >= 0;
      },
      default: null,
    },
    admin: { type: mongoose.Schema.ObjectId, ref: "User" },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
groupScheme.virtual("membersCount").get(function () {
  return this.members.length;
});
// TODO on creation of new entry we want to specify the admin id and
// automatically this id is pushed in group members array
const Group = mongoose.model("Group", groupScheme);
module.exports = Group;
