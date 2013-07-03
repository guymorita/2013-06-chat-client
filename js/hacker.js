$.ajaxPrefilter(function(settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
});
var TRVPMSSGXS =["$O TURNT","SHAWTAY SAY SHE GOTTA MANS WHAT THAT GOTTA DO WIT ME","CIRCO PATRON POPPIN A NEW BOTTLE","AY WHO AT THE LIBRARY FINNA $MOKE A WHOLE POUND?","YA TU $ABE$"];
var messageObject,sendText;
for (var i=0; i<5;i++){
    messageObject ={
      username: "Jake",
      text: TRVPMSSGXS[Math.floor(Math.random()*6)]
    };
    sendText = JSON.stringify(messageObject);
    $.ajax({
      type: "POST",
      url: 'https://api.parse.com/1/classes/messages',
      data: sendText,
      contentType: 'application/json'
    });
}