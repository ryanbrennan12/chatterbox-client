
$(document).ready( () => app.init() );

var message = {
  username: 'rmrmrm',
  text: 'trololo',
  roomname: '4chan'
};



var app = {
  init: function() {
    var selected = $( '#roomSelect option:selected' ).text();
    app.fetch(selected);
    $( '#sendBtn' ).on('click', function() {
      app.send(message);
    });
    $( '#fetchBtn' ).on('click', function() {
      app.fetch(selected);
    });
    $('#roomSelect').on('change', function() {
      app.clearMessages();
      console.log(selected);
      selected = $( '#roomSelect option:selected' ).text();
      app.fetch(selected);
    });
    $(document).on('click', '.username', function(event) { app.handleUsernameClick(event); });
  },
  send: function(message) {
    $.ajax({
      url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        app.renderMessage(message);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function(selection) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: { order: '-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        var date;
        data.results.forEach(function(msg) {
          date = new Date (msg.updatedAt);
          date = date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
          if (selection === 'undefined' && !msg.roomname) {
            $('<p class = \'message\'></p>').appendTo('#chats');
            $('.message').last().text(function() {
              return `${date} `;
            });
            $('.message').append('<span class = \'username\'></span><span class = \'text\'></span>');
            $('.username').last().text(function() {
              return msg.username;
            });
            $('.text').last().text(function() {
              return JSON.stringify(msg.text);
            });
          } else if (selection === msg.roomname) {
            $('<p class = \'message\'></p>').appendTo('#chats');
            $('.message').last().text(function() {
              return `${date} `;
            });
            $('.message').append('<span class = \'username\'></span><span class = \'text\'></span>');
            $('.username').last().text(function() {
              return `${msg.username}`;
            });
            $('.text').last().text(function() {
              return `: ${msg.text}`;
            });
          }
        });
        $('option').not(`option:contains(${selection}), option:contains("undefined") `).remove();
        var roomnames = [];
        data.results.forEach(function(msg) {
          roomnames.push(msg.roomname);
        });
        _.uniq(roomnames).forEach(function(rmName) {
          if (rmName && rmName !== selection) {
            $('#roomSelect').append('<option></option>');
            $('option').last().text(rmName);
          }
        });
      },
      error: function (data) {
        console.error('chatterbox: Failed to fetch message', data);
      }
    });
  },
  server: 'http://parse.rpt.hackreactor.com/chatterbox/classes/messages',
  clearMessages: function() {
    $( '#chats' ).empty(); 
  },
  renderMessage: function(message) {
    $( '<p>chatterbox message successfully sent:' + JSON.stringify(message) + '</p>').appendTo( '#chats' );
  },
  renderRoom: function(newRoom) {
    $('#roomSelect').append('<option></option>');
    $('option').last().text(newRoom);
  },
  handleUsernameClick: function(event) {
    var friends = [];
    friends.push($(event.target).text());
    console.log('helloss');
    return friends;
  }
};








//   clearMessages: function() {
//     //deletes div from specrunner.html //NOT index.html
//     $('#chats').empty();
//   },
//   renderMessage: function() {

//     $('#chats').prepend('<div>' + message.text + '</div>'); //refactor
//   },
// };




