'use-strict'

var gw = new Groundwork({
    'api_url': 'https://api.thegroundwork.com',
    'oauth_client_id': 'pub-un.jesus-was-a-refugee-int-gdLg7Qe2LbLXcEVV2GxgKRzse6_D1Eb3I.dJkVKlTkwaQheidtD82Kk74pn625s9n.XYdCkYG6FHOYwx8JdRAQ'
});

var fields = { phone: null, city: null, state: null};

$(document).ready(function(){
  createEventListeners();
});

function sendData(data,form){
  data.tags = (data.tags || {});
  data.tags.send_email = 0;
  gw.supporters.create(data)
  .then(function(response){
      console.log(response);
      processResponse('success',form);
  })
  .catch(function(response){
      debugger;
      console.log(response);
      processResponse('failure',form);
  });
};

function createEventListeners(){
  storyListener();
  cardListener();
  celebrateListener();
}

function storyListener(){
  $('.story-form').submit(function(event){
    event.preventDefault();
    var data = collectData($('.story-form'));
    data.source = "refugee-jesus story-signup";
    sendData(data,'story');
  });
}

function cardListener(){
  $('.card-form').submit(function(event){
    event.preventDefault();
    var data = collectData($('.card-form'));
    data.source = "refugee-jesus card-signup";
    sendData(data,'card');
  });
}

function celebrateListener(){
  $('.celebrate-form').submit(function(event){
    event.preventDefault();
    var data = collectData($('.celebrate-form'));
    data.source = "refugee-jesus celebrate-signup";
    sendData(data,'celebrate');
  });
}

function collectData(form){
  var data = {};
  data.tags = {};
  var inputs = form.find(":input");
  $(inputs).each(function(key,value){
    if($(this).attr('name') === "name"){
      var names = splitNames($(this).val());
      $.each(names, function(key, value){
        data[key] = value;
      });
    }
    else if($(this).attr('name') === "email"){
      data.email = $(this).val();
    }
    else {
      $(this).val() != "" ? createProp($(this).attr('name') , $(this).val() , data) : null;
    }
  });
  return data;
}

function createProp(attribute,value,data){
  if(fields.hasOwnProperty(attribute)){
    data[attribute] = value;
  }
  else {
    data.tags[attribute] = value;
  }
}


function splitNames(name){
  var names = name.split(" ",2);
  var data = {};
  data.givenName = names[0];
  names[1] ? data.familyName = names[1] : null ;
  return data;
}

function processResponse(status,destination){
  var form = $('.' + destination + '-form');
  var msg = $('.' + destination + '-msg');

  
  if(status === 'success'){
    msg.html('Thanks for signing up!');
    msg.collapse('show');
    form.find('input').prop('disabled',true);
    form.find('button').prop('disabled',true);
  }
  else{
    msg.html("something went wrong, please try again");
    msg.collapse('show');
    form[0].reset();
  }
}