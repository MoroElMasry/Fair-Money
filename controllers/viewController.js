exports.getIndex = (req, res) => {
  res.status(200).render("index", {
    title: "Fair Money",
  });
};
exports.getSignUp = (req, res) => {
  res.status(200).render("signUp", {
    title: "Sign Up",
  });
};
exports.getSignIn = (req, res) => {
  res.status(200).render("signIn", {
    title: "Sign In",
  });
};
exports.getGroupList = (req, res) => {
  res.status(200).render("groupListPage", {
    title: "My Group List",
  });
};
exports.getCreateNewGroup = (req, res) => {
  res.status(200).render("createNewGroup", {
    title: "Create New Group",
  });
};
exports.getSpecificGroup = (req, res) => {
  res.status(200).render("specificGroupPage", {
    title: "group name",
  });
};
