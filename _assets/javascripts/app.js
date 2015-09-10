'use-strict'

$(document).ready(function(){
  submitEventListener();

});

function submitEventListener(){
  $form = $("#signup-form");

  $form.submit(function(event){
    event.preventDefault();
    $('.submit-button').val('Please Wait...').prop('disabled',true);

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
          $('.submit-button').val('Please Wait...').prop('disabled',true);
          $('#conf-message').html('').slideUp(700);
          $('#conf-message').html("Something went wrong, please try to submit your details again. If the problem persists, please contact us.").slideDown(700, function(){
            $('.submit-button').val('Get Your Bumper Sticker').prop('disabled',false);
          });
        }
        else {
          $('.submit-button').slideUp(700, function(){
            $('#conf-message').html("Thanks! We sent you an email. Please confirm your email address to receive your free sticker").slideDown(700);
          });
          
        }
      }
    });
  });
};