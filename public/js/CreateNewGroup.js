"use strict";

const forms = document.querySelector(".needs-validation");
const membersInput = document.querySelector("#grpMembers");
const addButton = document.querySelector("#addMemBtn");
const groupListElement = document.querySelector(".list-group");
const groupList = [];

// this function takes the input element you want to add option to and also take
// an array of elements you want to add
const addOptions = function (inputElement, options) {
  const datalist = inputElement.list;
  datalist.innerHTML = "";
  options.forEach((option) => {
    const html = `<option value="${option}"></option>`;
    datalist.insertAdjacentHTML("beforeend", html);
  });
};

const renderUserCard = function (user) {
  return `
  <li class="list-group-item">
    <div class="d-flex">
      <img
        src="${user.photo}"
        width="30"
        class="ms-1"
      />
      <h4 class="ms-3">${user.name}</h4>
      <button
        type="button"
        class="btn btn-seondary btn-outline-dark shadow ms-auto"
        onclick="this.parentNode.parentNode.remove();
        groupList.splice(groupList.indexOf(groupList.find(({email}) => email === '${user.email}')),1);
        console.log(groupList);"
      >
        Remove
      </button>
    </div>
  </li>`;
};
const removeIfExist = function (users, userEmail) {
  return users.filter(({ email }) => email !== userEmail);
};
const addMembers = async () => {
  try {
    const inputValue = membersInput.value;
    const res = await axios.get("http://127.0.0.1:8000/api/v1/users/search", {
      params: { input: inputValue },
    });
    const user = res.data.data.users.find(({ email }) => email === inputValue);
    if (user === undefined) throw new Error();
    if (groupList.some(({ email }) => email === user.email)) return;
    groupListElement.insertAdjacentHTML("afterbegin", renderUserCard(user));
    groupList.push(user);
    membersInput.value = "";
  } catch (err) {}
};
membersInput.addEventListener("input", async () => {
  const inputValue = membersInput.value;
  const res = await axios.get("http://127.0.0.1:8000/api/v1/users/search", {
    params: { input: inputValue },
  });
  const users = removeIfExist(res.data.data.users, res.data.userEmail);
  const usersEmails = users.map((user) => user.email);
  addOptions(membersInput, usersEmails);
});

addButton.addEventListener("click", addMembers);
membersInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    await addMembers();
  }
});

async function validate() {
  event.preventDefault();
  var grpN = document.getElementById("grpName").value;
  var GrpDesc = document.getElementById("grpDescription").value;
  var nREGEX = /^[a-zA-Z0-9\s]{3,15}$/; // at least lower 3 upper space

  if (grpN == "" || GrpDesc == "") {
    // alert("Please Fill The Missing Fields!");
    swal("Some Field is Empty!", "Please fill the next fields!", "warning");
    return false;
  } else {
    if (nREGEX.test(grpN) == false) {
      // alert("Please enter a valid Group Name");
      swal("Oops! Wrong Format!", "Please enter a valid Group name!", "error");
      return false;
    }

    var mREGEX = /^[a-zA-Z0-9\s]{0,115}$/; // at least 3 lower upper space
    if (mREGEX.test(GrpDesc) == false) {
      // alert("Please enter a valid Group Description!");
      swal(
        "Oops! Wrong Format!",
        "Please enter a valid Group Description!",
        "error"
      );
      return false;
    }
    if (!groupList.length) {
      swal(
        "Oops! Wrong Format!",
        "Please enter at least one group memeber",
        "error"
      );
      return false;
    }
    try {
      const groupListEmails = groupList.map(({ _id }) => _id);
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/v1/groups/",
        data: {
          name: grpN,
          description: GrpDesc,
          members: groupListEmails,
        },
      });
      location.assign("./groupListPage");
    } catch (err) {
      console.log(err);
      swal("something went wrong", "while sending the request", "error");
    }
  }
}
