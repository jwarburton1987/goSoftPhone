// var input=document.querySelectorAll("#phoneNumField input")[0];
// // var reset=document.querySelectorAll(".reset button")[0];
// var btn = document.querySelectorAll(".column button");

var inputNum = $("#phoneNumField").val();
var btnVal = $(".numBtn").text();
console.log(btnVal);

$(".numBtn").click(function() {
    
});


for(var i=0; i<btn.length;i++){
   btn[i].addEventListener(`click`,function(){

       var num1=input.value;
       var num2=this.childNodes[0].nodeValue;
       
       var num=num1+num2;
       input.value=num;  

   });
}



