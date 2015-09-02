'use-strict'

$(document).ready(function(){
  console.log("ready");
  submitEventListener();

});

function submitEventListener(){
  var form = $("#signup-form");

  form.submit(function(event){
    event.preventDefault();
    var data = form.serialize();
    console.log(data);
  });
};