const login = async (email, password) => {
  try {
    const res = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    location.assign("./");
    // location.reload(true);
  } catch (err) {
    swal("wrong email or passwrod", "please try again", "error");
  }
};

function validate() {
  event.preventDefault();
  const email = document.getElementById("emailAddress").value;
  const password = document.getElementById("password").value;
  if (email == "" || password == "") {
    // alert("Please Fill The Missing Fields!");
    swal("Some Field is Empty!", "Please fill the next fields!", "warning");
    return false;
  } else {
    const mREGEX = /^[a-zA-Z0-9_\.]{2,}@[a-zA-Z]+.[a-zA-Z]+$/;
    if (mREGEX.test(email) == false) {
      // alert("Please enter a valid e-mail!");
      swal("Oops! Wrong Format!", "Please enter a valid e-mail!", "error");
      return false;
    }
    const pRegex = /^([a-zA-Z$_0-9]){8,32}$/;
    if (pRegex.test(password) == false) {
      // alert("please enter a valid password");
      swal("Oops! Wrong Format!", "please enter a valid password!", "error");
      return false;
    }
    login(email, password);
  }
}
