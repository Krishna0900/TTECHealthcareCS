$(document).ready(function(){

console.log("Clearing the Pega-RULES and JSESSIONID cookies");

  document.cookie = 'Pega-RULES=;expires=Thu, 01-Jan-70 00:00:01 GMT;path=/prweb';
document.cookie = 'JSESSIONID=;expires=Thu, 01-Jan-70 00:00:01 GMT;path=/prweb/';


  getAssignment();
	
})

var xhttp = new XMLHttpRequest();

var selectedAssignment;

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getTheCookie(cname) {
      var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
 

function getAssignment() {

    var username = getTheCookie("username");

    var password = getTheCookie("password");


    if (username == "") username = "bethamiller74@gmail.com";

    if (password == "") password = "Install@123";

    xhttp.open("GET", "https://pegaworld18.pegatsdemo.com/prweb/api/v1/assignments", true);

    xhttp.setRequestHeader("Authorization", "Basic " + btoa(username+":"+password));

    xhttp.addEventListener("load", getAssignmentComplete);

    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send();

}

 

 

function getAssignmentComplete(event) {

/*    console.log("getAssignment completed"); */

    if (xhttp.responseText == "") {

console.log("No response text. There must be an error.");

    } else {

        var response = JSON.parse(xhttp.responseText);

        if (response.assignments.length > 0) {

            selectedAssignment = response.assignments[0];

 

 

            /* find assignment gadget and replace */

            var assign = document.getElementById("assignment_name");

            if(assign != null) {

                document.getElementById("assignment_name").innerHTML = selectedAssignment.name;

                document.getElementById("assignment_instructions").innerHTML = selectedAssignment.instructions;

                var section = document.getElementsByClassName("open-activity")[0];

                section.style.display = "block";

            }

 

 

            var assign_gadget = document.getElementById("assign_gadget");

            if (assign_gadget != null) {
		

                var pegaAParamObj = {};

                pegaAParamObj.UserIdentifier="CSHCSelfService";

                pegaAParamObj.Password="cnVsZXM=";

                pegaAParamObj.pzSkinName="B2C";
		window.setTimeout(function() { pega.web.api.doAction("PegaGadget", "openAssignment", selectedAssignment.ID,pegaAParamObj);
                             },1000); 

//                pega.web.api.doAction("PegaGadget", "openAssignment", selectedAssignment.ID,pegaAParamObj);

            }

        }

    }

}