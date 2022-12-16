exports.getAllGroups = (req, res) => {
  res.status(200).json({
    status: "success",
    results: "<number of groups>",
    data: {
      groups: "<groups data>",
    },
  });
};
exports.getGroup = (req, res) => {
  // const id = +req.params.id;
  res.status(200).json({
    satisfies: "success",
    data: {
      group: "<group data>",
    },
  });
};
exports.createGroup = (req, res) => {
  // 201 means created
  res.status(201).json({
    status: "success",
    data: {
      group: "<new group data>",
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
