function validate()
{
  var n = document.getElementById("name").value;
  var nREGEX = /^[a-zA-Z\s]{3,}$/; // at least lower uper space
  if (nREGEX.test(n) == false) 
  {
    alert("Please enter a valid name!");
    // swal("Oops! Wrong Format!", "Please enter a valid name!", "warning");
    return false;
  }
  var m = document.getElementById("mail").value;
  var mREGEX = /^[a-zA-Z0-9_\.]{2,}@[a-zA-Z]+.[a-zA-Z]+$/; //AT LEAST TWO : upper-,lower- case, numbers, underscore, dot @ whatever . whatever letters
  if (mREGEX.test(m) == false) 
  {
    alert("Please enter a valid e-mail!");
    // swal("Oops! Wrong Format!", "Please enter a valid e-mail!", "error");
    return false;
  }
  var p = document.getElementById("pass").value;
  var pRegex = /^([a-zA-Z$_0-9]){8,32}$/;
  if (pRegex.test(p) == false) {
    alert("please enter a valid password!");
    // swal("Oops! Wrong Format!", "please enter a valid password!", "error");
    return false;
  }
  await(10000)
  }
