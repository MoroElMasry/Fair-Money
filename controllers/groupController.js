const Group = require("../models/groupModels");
const catchAsync = require("../utils/catchAsync");

exports.getAllGroups = catchAsync(async (req, res, next) => {
  const Id = req.user._id;
  let groups = await Group.find({ members: { $in: [Id] } }).select("-__v");
  groups = groups.map(
    ({ _id, name, description, updatedAt, membersCount }) => ({
      _id,
      name,
      description,
      updatedAt,
      membersCount,
    })
  );
  res.locals.groups = groups;
  next();
});
exports.getGroup = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const group = await Group.findOne({
    _id: id,
    members: { $in: [req.user._id] },
  });
  if (!group)
    throw new Error(
      "this group might be deleted by the admin, or might be removed from the group"
    );
  res.locals.group = group;
  // res.status(200).json({
  //   satisfies: "success",
  //   data: {
  //     group: group,
  //   },
  // });
  next();
});
exports.createGroup = async (req, res) => {
  const newGroup = await Group.create({
    name: req.body.name,
    description: req.body.description,
    admin: req.user._id,
    members: req.body.members,
  });
  // 201 means created
  res.status(201).json({
    status: "success",
    data: {
      group: newGroup,
    },
  });
};

exports.updateGroup = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      group: "<updated group data>",
    },
  });
};
exports.deleteGroup = (req, res) => {
  // 204 : no content
  res.status(204).json({
    status: "success",
    data: null,
  });
};
