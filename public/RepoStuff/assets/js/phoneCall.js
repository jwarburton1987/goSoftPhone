$(document).ready(function(){
  $("#suffix-X").click(function() {
    $("#textarea1").empty();
  });

  // $(".keypad").prepend(
  //   `<div class="columns">
  //   <form class="column">
  //     <div class="input-field">
  //       <textarea id="textarea1" class="materialize-textarea"><i class="material-icons" id="suffix-X">close</i></textarea>
  //     </div>
  //   </form>
  // </div><br>`
  // );
  $(".keypad").prepend(
    `<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="numBox">
        <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="phoneNumField" placeholder="">
        <label class="mdl-textfield__label" for="phoneNumField"><i class="material-icons mdl-textfield__label__icon">close</i></label>
        <span class="mdl-textfield__error">Input is not a number!</span>
      </div>`
  );


// $()

// $(".mdl-textfield").focusin(function() {
//   $(".mdl-textfield__label").css("padding-top", "30px");
// });

if($("#numBox").hasClass("is-focused")) {
  $(".mdl-textfield__label__icon").css("padding-top", "30px");
}else{
  $(".mdl-textfield__label__icon").css("padding-top", "10px");
}
});
// <!-- Numeric Textfield with Floating Label -->
// <form action="#">
//   <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
//     <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="phoneNumField">
//     <label class="mdl-textfield__label" for="phoneNumField"><i class="material-icons mdl-textfield__label__icon">close</i></label>
//     <span class="mdl-textfield__error">Input is not a number!</span>
//   </div>
// </form>

// `<div class=
//     "mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-text-field--with-leading-icon is-upgraded"
//     data-upgraded=",MaterialTextfield">
//         <input class="mdl-textfield__input" id="textfield-EmailAddress" type=
//         "email">
//         <label class="mdl-textfield__label" for=
//         "textfield-EmailAddress"><i class="material-icons mdl-textfield__label__icon">mail</i></label>
//         <i class="material-icons mdl-text-field__icon" tabindex="0" role="button">event</i>
//   </div>` 