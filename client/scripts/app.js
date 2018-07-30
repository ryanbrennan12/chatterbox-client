var app = {
  init: function() {},
  send: function(message) {
    $.ajax({
    
      url: 'http://parse.RPT.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent', data);
      },
      error: function (data) {
      
        console.log('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/message',
      type: 'GET',
      // data: JSON.stringify('username'),
      contentType: 'application/json',

      success: function (data) {
        data.forEach(function(ele) {

        });
        console.log('chatterbox: Message Fetched', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch message', data);
      }
    });
  },
  server: 'http://parse.RPT.hackreactor.com/chatterbox/classes/messages/message',

  clearMessages: function() {
    //deletes div from specrunner.html //NOT index.html
    $('#chats').empty();
  },
  renderMessage: function() {

    $('#chats').prepend('<div>' + message.text + '</div>'); //refactor
  },
};

$(document).ready(function() {

  $('#sendBtn').on('click', function() {
    app.renderMessage();
    // app.send(message)

  });
  $( '#fetchBtn' ).on('click', function() {
    app.fetch(JSON.stringify('B3BVBAAzY'));
  });


});

var message = {
  username: 'Ryan Meng',
  text: 'Testing',
  roomname: 'TBD'
};


