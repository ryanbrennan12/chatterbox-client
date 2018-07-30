$(document).ready(function() {
  $( '#main' ).on('click', function() {
    console.log('hello');
  });
  $( '#sendBtn' ).on('click', function() {
    app.send(message);
  });
  $( '#fetchBtn' ).on('click', function() {
    app.fetch();
  });
});



var message = {
  username: 'rmrmrm',
  text: 'trololo',
  roomname: '4chan'
};



var app = {
  init: function() {},
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        $( '<p>chatterbox message successfully sent:' + JSON.stringify(message) + '</br></br>receipt: ' + JSON.stringify(data) + '</p>').appendTo( '#chats' );
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: 'order=-createdAt',
      contentType: 'application/json',
      success: function (data) {
        data.results.forEach(function(msg) {
          $( '<p><strong>' + msg.username + ': </strong>' + msg.text + '</p>').appendTo( '#chats' );
        });
        console.log(data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch message', data);
      }
    });
  },
  server: 'http://parse.rpt.hackreactor.com/chatterbox/classes/messages',
  // constructResults: function(msg, info){
  //   $( "<p>Test</p>" ).appendTo( ".chats" );

  // }
};





//   clearMessages: function() {
//     //deletes div from specrunner.html //NOT index.html
//     $('#chats').empty();
//   },
//   renderMessage: function() {

//     $('#chats').prepend('<div>' + message.text + '</div>'); //refactor
//   },
// };




