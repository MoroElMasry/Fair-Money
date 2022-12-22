const signup = async (name, email, password) => {
  try {
    const res = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/v1/users/signup",
      data: {
        name,
        email,
        password,
      },
    });
    location.assign("./");
  } catch (err) {
    swal("something went wrong", "try to enter you info again", "error");
  }
};

function validate() {
  event.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("mail").value;
  var password = document.getElementById("pass").value;
  var nREGEX = /^[a-zA-Z\s]{3,}$/; // at least lower uper space
  if (name == "" || email == "" || password == "") {
    // alert("Please Fill The Missing Fields!");
    swal("Some Field is Empty!", "Please fill the next fields!", "warning");
    return false;
  } else {
    if (nREGEX.test(name) == false) {
      // alert("Please enter a valid name!");
      swal("Oops! Wrong Format!", "Please enter a valid name!", "error");
      return false;
    }
    var mREGEX = /^[a-zA-Z0-9_\.]{2,}@[a-zA-Z]+.[a-zA-Z]+$/; //AT LEAST TWO : upper-,lower- case, numbers, underscore, dot @ whatever . whatever letters
    if (mREGEX.test(email) == false) {
      // alert("Please enter a valid e-mail!");
      swal("Oops! Wrong Format!", "Please enter a valid e-mail!", "error");
      return false;
    }
    var pRegex = /^([a-zA-Z$_0-9]){8,32}$/;
    if (pRegex.test(password) == false) {
      // alert("please enter a valid password!");
      swal("Oops! Wrong Format!", "please enter a valid password!", "error");
      return false;
    }
    signup(name, email, password);
  }
}
