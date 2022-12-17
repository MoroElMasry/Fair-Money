"use strict";

const forms = document.querySelector(".needs-validation");

function validate()
{
  var grpN = document.getElementById("grpName").value;
  var nREGEX = /^[a-zA-Z\s]{3,}$/; // at least lower 3 upper space
  if (nREGEX.test(grpN) == false) 
  {
    alert("Please enter a valid Group Name");
    // swal("Oops! Wrong Format!", "Please enter a valid Group name!", "error");
    return false;
  }
  
  
  var GrpDesc = document.getElementById("grpDescription").value;
  var mREGEX = /^[a-zA-Z\s]{3,}$/; // at least 3 lower upper space
  if (mREGEX.test(GrpDesc) == false) 
  {
    alert("Please enter a valid Group Description!");
    // swal("Oops! Wrong Format!", "Please enter a valid Group Description!", "error");
    return false;
  }
  
}
