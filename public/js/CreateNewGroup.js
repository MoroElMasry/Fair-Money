"use strict";

const forms = document.querySelector(".needs-validation");

function validate()
{
  var grpN = document.getElementById("grpName").value;
  var GrpDesc = document.getElementById("grpDescription").value;
  var nREGEX = /^[a-zA-Z\s]{3,15}$/; // at least lower 3 upper space

  if(grpN =='' || GrpDesc =='')
  {
    // alert("Please Fill The Missing Fields!");
    swal("Some Field is Empty!", "Please fill the next fields!", "warning");
    return false;
  }
  else
  {
    if (nREGEX.test(grpN) == false) 
    {
      // alert("Please enter a valid Group Name");
      swal("Oops! Wrong Format!", "Please enter a valid Group name!", "error");
      return false;
    }
    
    var mREGEX = /^[a-zA-Z\s]{,115}$/; // at least 3 lower upper space
    if (mREGEX.test(GrpDesc) == false) 
    {
      // alert("Please enter a valid Group Description!");
      swal("Oops! Wrong Format!", "Please enter a valid Group Description!", "error");
      return false;
    }
  }
  
}
