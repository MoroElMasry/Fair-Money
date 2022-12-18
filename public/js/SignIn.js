function validate()
{
    var m = document.getElementById("emailAddress").value;
    var p = document.getElementById("password").value;
    if(m =='' || p =='')
    {
      // alert("Please Fill The Missing Fields!");
      swal("Some Field is Empty!", "Please fill the next fields!", "warning");
      return false;
    }
    else
    {
      var mREGEX = /^[a-zA-Z0-9_\.]{2,}@[a-zA-Z]+.[a-zA-Z]+$/;
      if (mREGEX.test(m) == false) {
        // alert("Please enter a valid e-mail!");
        swal("Oops! Wrong Format!", "Please enter a valid e-mail!", "error");
        return false;
      }
      var pRegex = /^([a-zA-Z$_0-9]){8,32}$/;
      if (pRegex.test(p) == false) {
        // alert("please enter a valid password");
        swal("Oops! Wrong Format!", "please enter a valid password!", "error");
        return false;
      }
    }
    
  }
