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

$.ajaxPrefilter(function(settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
});

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
    events:{"click #submitbtn":"handleNewMessage"},
    handleNewMessage: function(event){
      event.preventDefault();
      debugger;
      console.log('jajaja');
      chat.latestMessages.create({
        text: $('#submittext').val(),
        username: chat.userName
      });
    },
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
  // $('#submitbtn').on('click', function(){
  //   event.preventDefault();
  //   chat.messageObject = {
  //     username: chat.userName,
  //     text: $('#submittext').val(),
  //     roomname: chat.room
  //   };
  //   chat.sendText = JSON.stringify(chat.messageObject);
  //   $.ajax({
  //     type: "POST",
  //     url: 'https://api.parse.com/1/classes/messages',
  //     data: chat.sendText,
  //     contentType: 'application/json'
  //   });
  //   $("#submittext").val('');
  //   $("#submittext").attr("value",'');
  //   return false;
  // });
});

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
setInterval(ratchetmessages,20000);
setInterval(function(){
  chat.updater();
},5000);