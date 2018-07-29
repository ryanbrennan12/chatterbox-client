var app = {
  init: function() {},
  send: function(message) {
    $.ajax({
    
      url: 'http://parse.RPT.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
      
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function() {
    $.ajax({
    
      url: 'http://parse.RPT.hackreactor.com/chatterbox/classes/messages/message',
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
     
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  server: 'http://parse.RPT.hackreactor.com/chatterbox/classes/messages/message'

};


var message = {
  username: 'Ryan Meng',
  text: 'Testing',
  roomname: 'TBD'
};

