// var input=document.querySelectorAll("#phoneNumField input")[0];
// // var reset=document.querySelectorAll(".reset button")[0];
// var btn = document.querySelectorAll(".column button");

// var inputNum = $("#phoneNumField").val();
// var btnVal = $(".numBtn").text();
// console.log(btnVal); - pattern="-?[0-9]*(\.[0-9]+)?"
var btnVal;
var btnInput = "";
var inputArr = [];


$(".numBtn").click(function() {
    btnVal = $(this).data("value");
    btnInput += btnVal;
    parseInt(btnInput);
    console.log(btnInput);
    console.log(btnVal);
    inputArr.push(btnInput);
    console.log(inputArr);
    console.log(inputArr[inputArr.length-1]);
    $("#phoneNumField").val(inputArr[inputArr.length-1]);
});


// for(var i=0; i<btn.length;i++){
//    btn[i].addEventListener(`click`,function(){

//        var num1=input.value;
//        var num2=this.childNodes[0].nodeValue;
       
//        var num=num1+num2;
//        input.value=num;  

//    });
// }



