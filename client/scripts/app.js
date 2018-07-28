var app = {
  init: function() {},
  send: function(message) {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.RPT.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function(){$.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.RPT.hackreactor.com/chatterbox/classes/messages/message',
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });},
  server: 'http://parse.RPT.hackreactor.com/chatterbox/classes/messages/message'

};


var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

