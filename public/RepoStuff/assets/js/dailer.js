var input=document.querySelectorAll(".input input")[0];
var reset=document.querySelectorAll(".reset button")[0];
var btn = document.querySelectorAll(".col-3 button");


for(var i=0; i<btn.length;i++){
   btn[i].addEventListener(`click`,function(){

       var num1=input.value;
       var num2=this.childNodes[0].nodeValue;
       
       num=num1+num2
       input.value=num;  

   });
}



