function validateform(){
    var un="thomasbrown01@gmail.com";
    var temppassword="rules";

    var username= document.login.username.value;
    var password= document.login.password.value;
if(username!=un){
    alert("invalid username");
    return false;
}
else if(password != temppassword){
    alert("invalid password");
    return false;

}
else if(username!="" && username==un) 
{
    setCookie("username", username, 30);
    return true;
}
console.log("login")
    
};
