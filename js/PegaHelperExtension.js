/* passing parameters dynamically - start */
function preparePegaAParams(gadgetName) {
	
	var pegaAParamObj = {};
    
 	pegaAParamObj.AppName="TTECCSHealthCareSelfService";	  
	pegaAParamObj.HelpConfigurationName="UPlusHealth";  
    /* replace the calls to getCookie with the appropriate function */
  
 	pegaAParamObj.ContactId=getCookie("ContactID");
	pegaAParamObj.MemberID=getCookie("MemberID");
  	pegaAParamObj.PolicyNumber=getCookie("PolicyNumber");
  	pegaAParamObj.HCCustomerType=getCookie("HCCustomerType");
	pegaAParamObj.Username=getCookie("Username");
   	pegaAParamObj.pzSkinName="OnlineHelp";	
  	pegaAParamObj.IsCallerAMember=getCookie("IsCallerAMember");
	alert(getCookie("ContactID"));
	return pegaAParamObj;
}

/* Set cookies. To be overwritten locally */
  if(getCookie("username")=="thomasbrown01@gmail.com")
{
	
setCookie("ContactID", "MB2015072410", 30);
  setCookie("MemberID","MB2015072410", 30);
  setCookie("PolicyNumber","PO2015092894", 30);
setCookie("HCCustomerType","Member", 30);
setCookie("Username","Thomas Brown", 30);
setCookie("IsCallerAMember","true", 30);
	
}
else if(getCookie("username")=="")
{
  
  setCookie("ContactID", "", 30);
  setCookie("MemberID","", 30);
  setCookie("PolicyNumber","", 30);
setCookie("HCCustomerType","", 30);
setCookie("Username","", 30);
setCookie("IsCallerAMember","false", 30);
}
else
{
	
 setCookie("ContactID", "MB2015072427", 30);
  setCookie("MemberID","MB2015072427", 30);
  setCookie("PolicyNumber","PO2015092893", 30);
setCookie("HCCustomerType","Member", 30);
setCookie("Username","Jane Schlatter", 30);
setCookie("IsCallerAMember","true", 30);
}


function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
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



  
