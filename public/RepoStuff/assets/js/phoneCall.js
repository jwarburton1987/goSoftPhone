$(document).ready(function(){
  $.get("/api/user_data", function(data) {
    $(".userEmail").html(data.email + "'s Twilio # is: (714) 695-5738");
  });
  $("#suffix-X").click(function() {
    $("#textarea1").empty();
  });

  $("#call-controls").prepend(
    `<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="numBox">
        <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="phoneNumField" placeholder="Enter a phone #">
        
        <label class="mdl-textfield__label" for="phoneNumField"></label>
        <span class="mdl-textfield__error">Input is not a number!</span>
        <div class="iconBox reset"><a href="" id="restphone"><i class="material-icons mdl-textfield__label__icon icons" id="closeIcon">close</i></a></div>
      </div>`
  );

if($("#numBox").hasClass("is-focused")) {
  $(".mdl-textfield__label__icon").css("padding-top", "30px");
}else{
  $(".mdl-textfield__label__icon").css("padding-top", "10px");
}

$("#closeIcon").hover(function() {
  $(this).fadeTo(250, 1, function() {
    $("#closeIcon").click(function() {
      $("#phoneNumField").empty();
    });
  });
}, function() {
  $("#closeIcon").fadeTo(250, 0.3);
});

$("#button-hangup").hover(function() {
  $(this).css("color", "red");
}, function() {
  $(this).css("color", "white");
});

// $("#button-call").hover(function() {
//   $(this).css("color", "green !important");
// }, function() {
//   $(this).css("color", "white !important");
// });

});
