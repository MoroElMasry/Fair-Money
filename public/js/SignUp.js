function validate()
{
  var n = document.getElementById("name").value;
  var m = document.getElementById("mail").value;
  var p = document.getElementById("pass").value;

  var nREGEX = /^[a-zA-Z\s]{3,}$/; // at least lower uper space
  if(n == '' || m =='' || p =='')
  {
    // alert("Please Fill The Missing Fields!");
    swal("Some Field is Empty!", "Please fill the next fields!", "warning");
    return false;
  }
  else
  {
    if (nREGEX.test(n) == false) 
    {
      // alert("Please enter a valid name!");
      swal("Oops! Wrong Format!", "Please enter a valid name!", "error");
      return false;
    }
    var mREGEX = /^[a-zA-Z0-9_\.]{2,}@[a-zA-Z]+.[a-zA-Z]+$/; //AT LEAST TWO : upper-,lower- case, numbers, underscore, dot @ whatever . whatever letters
    if (mREGEX.test(m) == false) 
    {
      // alert("Please enter a valid e-mail!");
      swal("Oops! Wrong Format!", "Please enter a valid e-mail!", "error");
      return false;
    }
    var pRegex = /^([a-zA-Z$_0-9]){8,32}$/;
    if (pRegex.test(p) == false) 
    {
      // alert("please enter a valid password!");
      swal("Oops! Wrong Format!", "please enter a valid password!", "error");
      return false;
    }
  }
  
}
