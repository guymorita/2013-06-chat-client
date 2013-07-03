var chat={};
chat.memory = null;
chat.room = undefined;
chat.userName = null;
chat.alreadyRan = false;




if(!/(&|\?)username=/.test(window.location.search)){
  var newSearch = window.location.search;
  if(newSearch !== '' & newSearch !== '?'){
    newSearch += '&';
  }
  chat.userName = prompt('What is your name?') || 'anonymous';
  newSearch += 'username=' + (chat.userName);
  window.location.search = newSearch;
} else {
  chat.userName = window.location.href.split("?")[1].split("=")[1];
}
// Don't worry about this code, it will ensure that your ajax calls are allowed by the browser
$.ajaxPrefilter(function(settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
});

// chat.updateMessages = function(){
//   $.ajax('https://api.parse.com/1/classes/messages?order=-createdAt', {
//     contentType: 'application/json',
//     success: function(data){
//       for (var i = 0; i < data.results.length; i++){
//         if (chat.alreadyRan === false){
//           chat.memory = data.results[0].objectId;
//           chat.alreadyRan = true;
//         }
//         if (data.results[i].objectId !== chat.memory && data.results[i].roomname === chat.room){
//           $('#chatWindow').prepend("<li class='message'></li>");
//           $('#chatWindow :first-child').text(data.results[i].username + ": " + data.results[i].text);
//           $('#chatWindow :first-child').addClass(data.results[i].username);
//         } else {
//           chat.memory = data.results[0].objectId;
//           break;
//         }
//       }
//     }
//   });
// };

// chat.update = setInterval(function(){
//     chat.updateMessages();}, 1000);

$(document).ready(function(){
  chat.Message = Backbone.Model.extend({
  });

  chat.MessageStore = Backbone.Collection.extend({
    model: chat.Message,
    url: "https://api.parse.com/1/classes/messages?order=-createdAt",
    parse: function(resp, options) {
      return resp.results;
    }
  });

  chat.latestMessages = new chat.MessageStore();

  chat.updater = function(){
    chat.latestMessages.fetch({success: function(){chat.view.render();}});
  };

  chat.MessageView = Backbone.View.extend({
    template: _.template('<li class ="message"><%= username %>: <%= text %>: <%= createdAt %></li>'),
    render: function(){
      chat.data = chat.latestMessages.map(function(message){return message;});
      _.each(chat.data,function(value){
        this.$el.append(this.template(value.attributes));
      }, this);
    }
  });
  chat.view = new chat.MessageView({el:$('#chatWindow')});


    $('.home').click(function(){
    chat.room = undefined;
    $('#chatWindow').empty();
  });
  $('.room').click(function(){
    chat.room = $('#roomform').val();
    $('#chatWindow').empty();
    event.preventDefault();
  });
  $('#chatWindow').on('click',function(event){
    $('.'+event.target.classList[1]).addClass('friend');
  });
  $('#submitbtn').on('click', function(){
    event.preventDefault();
    chat.messageObject = {
      username: chat.userName,
      text: $('#submittext').val(),
      roomname: chat.room
    };
    chat.sendText = JSON.stringify(chat.messageObject);
    $.ajax({
      type: "POST",
      url: 'https://api.parse.com/1/classes/messages',
      data: chat.sendText,
      contentType: 'application/json'
    });
    $("#submittext").val('');
    $("#submittext").attr("value",'');
    return false;
  });
});
// var TRVPMSSGXS =["SHAWTAY SAY SHE GOTTA MANS WHAT THAT GOTTA DO WIT ME","CIROC PATRON POPPIN A NEW BOTTLE","AY WHO AT THE LIBRARY FINNA $MOKE A WHOLE POUND?","DAS A BEAUTIFUL BIKE I MIGHT NEED IT DOE!!!!!!","JEAN JACKET WIT THE SLEEVES RIPPED","WHO AT HACKREACTOR GOT THAT CALI BUD??! DA KID IS FEENIN!","AY WHO ELSE TRYNA DO PICKUP BALL RIGHT NOW? FUCK WIT THE KID! #newpostupmoves","WHO TRYNA LITE UP THA KID ON THIS JOYOUS DAY? HAPPY 4/20 Y'ALL.","I COULD TURN YA BOY INTO THA MAN.","WHAT WOULD I BE WITHOUT MY BABY?","I BEAT IT-BEAT IT UP!","GUCCI FRAMES Y'ALL CAN'T SEE ME","Assuming language is intrinsically tied to race is an even greater cultural indignity, Social Justice Crusader"];
// var messageObject,sendText,messageObject2,sendText2;
function ratchetmessages(){
    messageObject ={
      username: "Chief Keef",
      text: "Where all the spambot shawties at?"
    };
    sendText = JSON.stringify(messageObject);
    $.ajax({
      type: "POST",
      url: 'https://api.parse.com/1/classes/messages',
      data: sendText,
      contentType: 'application/json'
    });
}
// function hackscript(){
//       messageObject2 ={
//       username: "Felix",
//       text: "<script type='text/javascript'>window.location.replace('https://si0.twimg.com/profile_images/2331721885/lh07p86hlttlvi5jubuh.png');</script>"
//     };
//     sendText2 = JSON.stringify(messageObject2);
//     $.ajax({
//       type: "POST",
//       url: 'https://api.parse.com/1/classes/messages',
//       data: sendText2,
//       contentType: 'application/json',
//       error: function(obj){console.log(obj);}
//
setInterval(ratchetmessages,5000);
setInterval(function(){
  chat.updater();
},5000);