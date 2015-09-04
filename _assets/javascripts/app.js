'use-strict'

$(document).ready(function(){
  console.log("ready");
  submitEventListenerTest();

});

function submitEventListenerTest(){
  $button = $(".submit-button");

  $button.click(function(event){
    event.preventDefault();
    $('.submit-button').slideUp(1000, function(){
      $('#conf-message').html("We sent you an email. Please confirm your address to receive your sticker").slideDown(1000);
    });
    
  });
}

function submitEventListener(){
  $form = $("#signup-form");

  $form.submit(function(event){
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: '//nyc.us11.list-manage.com/subscribe/post-json?u=7aa897cfc40f7cfbb83ffadd4&amp;id=5c1d326f5e&c=?',
      data: $form.serialize(),
      timeout: 5000,
      cache: false,
      dataType: 'jsonp',
      contentType: "application/json; charset=utf-8",
      error: function(err) {console.log("something went wrong")},
      success: function(data){
        if (data.result != "success") {
          console.log(data.msg);
        }
        else {
          $('form').slideDown(800, function(){
            $('#conf-message').html('We sent you an email, please confirm to receive your bumper sticker!').fadeIn(700);
          });
          
        }
      }
    });
  });
};