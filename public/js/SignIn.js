function validate()
{
    var m = document.getElementById("emailAddress").value;
    var mREGEX = /^[a-zA-Z0-9_\.]{2,}@[a-zA-Z]+.[a-zA-Z]+$/;
    if (mREGEX.test(m) == false) {
      alert("Please enter a valid e-mail!");
      // swal("Oops! Wrong Format!", "Please enter a valid e-mail!", "error");
      return false;
    }
    var p = document.getElementById("password").value;
    var pRegex = /^([a-zA-Z$_0-9]){8,32}$/;
    if (pRegex.test(p) == false) {
      alert("please enter a valid password");
      // swal("Oops! Wrong Format!", "please enter a valid password!", "error");
      return false;
    }
  }
