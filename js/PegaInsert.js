

var nbamServiceCtrl = getNBAMServiceControl("V2",false);
//Using current hostname and port currently
nbamServiceCtrl.initialize(window.location.hostname, window.location.port);

function createCookie(name,value,days) {
        if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
        } else{
        var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }
}


function loginDemo(username) {
   var email = "";
  if (username){
      switch (username) {
         case "barbara":
            email = "bstockton@pegats.com";
            break;
         case "troy":
            email = "troymurphy@pegatsdemo.com";
            break;
         case "joanne":
            email = "jsanchez@pegats.com";
            break;
         case "robert":
            email = "roberthill@pegatsdemo.com";
            break;
         default:
            email = "";
            break;
      }

    sessionStorage.setItem('email', email);
    if (username)
      sessionStorage.setItem('firstName', username);
    //createCookie("email", email, 30);
    //NBAM('index.html', 'ubank_index_banner');
  }
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
} 

function logout() {
   var storage = window['sessionStorage'];
   var email = storage.getItem('email');
   createCookie("email", email, -1);
   storage.clear();
   window.location.reload();
}

function NBAM(currentPage, container) {
  
   var reqst = new XMLHttpRequest();
   var email = sessionStorage.getItem('email');
   if (email == null) email = "";
   
   var previousPage = sessionStorage.getItem('previousPage');
   if (previousPage == null) previousPage = "";
   
   var params = "CurrentPage=" + currentPage + "&PreviousPage=" + previousPage + "&Email=" + email;
   
   var loginID = sessionStorage.getItem('CustomerID');
   var customerID = (loginID == null) ? "" : loginID;  //if not logged in, default to troy's ID for now
   var containerName = (container !== null) ? container : "";  //"UBank";
   if (loginID)
   {
      //containerName += "_" + loginID;
   }
   
   console.log("ContainerName: " + containerName);

   var channel = "";
   nbamServiceCtrl.getOffers(customerID, containerName, channel, previousPage, currentPage, handleResponse);
  
   sessionStorage.setItem('previousPage', currentPage);

    var webEventJSONObj = {
        "Description" : currentPage,
        "CustomerID" : customerID,
        "EventId" : "",
        "Reason" : "VIEW"
      };
	
	if(sessionStorage.getItem("CustomerID") !== null){
		buildRequestURL(currentPage);
		if(sessionStorage.getItem("RequestURL") !== null){
			//insertEventRequestImage();
		}
	} 
}

function openClick(url){



var href = window.location.href;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";
window.open(dir+"redirect.html?url="+url,'_self');
}

function handleResponse(data) { 
 data.RankedResults=data.ContainerList[0].RankedResults;
     if(data.OffersList && data.OffersList.length >0){
    parseResponseData(data.OffersList);
   } else if(data.RankedResults && data.RankedResults.length) {
    parseResponseData(data.RankedResults);
   }
     $("#txt_UID").text(getCookie("MKTID"));
   
  /* for (var i=0; i<xmlDoc.getElementsByTagName ("ImageURL").length; i++) {
      //Get the src for the img tag...
      var ba = document.getElementById("BannerAd" + i);
      var tagname = "BannerURL";
      if (ba && $(ba).hasClass("smimg")) {
         tagname = "BannerURLSmall";
      }
      var urlNode = xmlDoc.getElementsByTagName (tagname)[i];
      //If no image found, assume no *small*, so default back to large one
      if (!(urlNode && urlNode.childNodes[0])) urlNode = xmlDoc.getElementsByTagName ("BannerURL")[i];
      var bannerURL = urlNode.childNodes[0].nodeValue;
      if (ba) ba.src = bannerURL;
      
      //Get the href for the anchor/link tag
      var refNode = xmlDoc.getElementsByTagName ("BannerRef")[i];
      var bannerRef = refNode.childNodes[0].nodeValue;
      
      var bc = document.getElementById("BannerClick" + i);
      if (bc) bc.href = bannerRef;
   }   */
}

function parseResponseData(OffersList){
  for (var i=0; i < OffersList.length; i++) {
      //Get the src for the img tag...
      var ba = document.getElementById("BannerAd" + i);
      if (ba) {
        var theurl = OffersList[i].ImageURL;
        var ptindex = theurl.lastIndexOf(".");
        var suffix = "";
        var newurl = theurl;
      if (ptindex > -1) {
        var first = theurl.substr(0,ptindex);
        var last = theurl.substr(ptindex);
      if ($(ba).hasClass("smimg")) {
        suffix = "SM";
      }
      if ($(ba).hasClass("lgimg")) {
        suffix = "LG";
      }
      newurl = first + suffix + last;
    }

    ba.src = newurl;
    ba.setAttribute("title",OffersList[i].OfferName);
      }

     
     var baTitle = document.getElementById("BannerAd" + i + "Title");
      if (baTitle) {
        var theName = OffersList[i].Label;
        baTitle.innerText = theName;
      
      }

    var baDescription = document.getElementById("BannerAd" + i + "Desc");
      if (baDescription) {
        var theDesc = OffersList[i].ShortDescription;
        baDescription.innerText = theDesc;
      
      }
      

    
    var bc = document.getElementById("BannerAd" + i);
    var url = OffersList[i].ClickThroughURL;
    if (bc && url) {
        $(bc).data("clickurl", url);
      bc.addEventListener('click', function(){
               var theurl = $(this).data("clickurl");
               openClick(theurl);
        },false);
    }
     var bl = document.getElementById("BannerLink" + i);
    var urll = OffersList[i].ClickThroughURL;
    if (bl && urll) {
        $(bl).data("clickurl", urll);
      bl.addEventListener('click', function(){
               var theurll = $(this).data("clickurl");
               openClick(theurll);
        },false);
    }
   }
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            var MKTID =  c.substring(name.length, c.length);            
      return MKTID ;
        }
    }
    return "";
}

function captureOfferResponse(outcome,behaviour,callback){
  var data = JSON.parse(sessionStorage.getItem('OffersData'));
    if(data.OffersList){
      nbamServiceCtrl.captureWebResponse(data.ContainerName,data.CustomerID,data.OffersList[0].OfferID,data.OffersList[0].Issue,data.OffersList[0].Group,data.OffersList[0].InteractionID,outcome,behaviour,"Web",data.Direction,data.OffersList[0].CampaignID,callback);
    } else if(data.RankedResults) {
      nbamServiceCtrl.captureResponse(sessionStorage.getItem('containerName'),sessionStorage.getItem('CustomerID'),data.RankedResults[0].Name,data.RankedResults[0].Issue,data.RankedResults[0].Group,data.RankedResults[0].InteractionID,outcome,behaviour,"Web",data.Direction,data.RankedResults[0].CampaignID,data.RankedResults[0].Treatment,callback);
    } else {
        $('#captureResponsePanel').text(data.Message);
    }
}

function buildRequestURL(currentPage){
	//Clean up RequestURL
	sessionStorage.removeItem("RequestURL");
	
	//Base URL and Service
	var baseURL = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
	var serviceExtension = "/prweb/PRHTTPService/MKT/RH/WEC";
	
	//Build parameter string
	var param_customerID = "CID=" + (sessionStorage.getItem("CustomerID") !== null ? sessionStorage.CustomerID : "noID");
	console.log(param_customerID);
	var param_eventID = "EID=''";
	var param_description = "DESC=" + (currentPage !== "" ? currentPage : "UndefinedPage");
	var param_reason = "R=VIEW";
	var requestParameters = "?" + param_customerID + "&" + param_eventID + "&" + param_description + "&" + param_reason;
	
	//Build full request URL and save to session storage
	var requestURL = baseURL + serviceExtension + requestParameters;
	sessionStorage.setItem("RequestURL", requestURL);
}
function insertEventRequestImage(){
	//Build fake image to trigger service call
	var requestElement = document.createElement("img");
	requestElement.src = sessionStorage.RequestURL;
	requestElement.width = "1px";
	requestElement.height = "1px";
	
	//Append request image to body
	document.body.appendChild(requestElement);
}
