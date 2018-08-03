$(document).ready(function(){

  // var table = $("#table tbody");

  $.post("/api/contacts", function(data){
    console.log(data);
    $(".tableAppend").append(data.data);
  });


  $.get("/api/user_data", function(data) {
    $(".userEmail").html(data.email + "'s Twilio # is: (714) 695-5738");
    // $("#userTwilioNum").html("Your SoftPhone # is:" + "<br>" + "(714) 695-5738");
  });
//   res.json({
//     message: "Your Table is Ready!",
//     data: postReservation
// });

// $.post("/api/tables", newReservation,
// function (data) {

//   // If a table is available... tell user they are booked.
//   if (data) {
//       alert(data.message);
//   }

//   // If a table is available... tell user they on the waiting list.
//   else {
//       alert(data.message);
//   }







  // $.each(data, function(idx, elem){
  //     table.append("<tr><td>"+elem.username+"</td><td>"+elem.name+"</td>   <td>"+elem.lastname+"</td></tr>");
  // });

});