window.addEventListener("message",function(event){
  var eventData = event.data;
  if(eventData != null && eventData.action != null ){
    if(eventData.action == "redirectTo"){
      window.location.href = eventData.options.url;
    }
  }
},false);