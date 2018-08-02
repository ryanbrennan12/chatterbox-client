$(document).ready( () => {
  app.init();
  $('#send').submit(function( event ) {
    event.preventDefault();
    console.log('hellso');
    app.clearMessages();
    var message = $('#message').val();
    app.handleSubmit(message);
  });
});
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
      selected = $( '#roomSelect option:selected' ).text();
      app.fetch(selected);
    });
    $(document).on('click', '.username', function(event) { app.handleUsernameClick(event); });
  },
  send: function(message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) { console.log('success'); },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function(selection) {
    $.ajax({
      url: app.server,
      type: 'GET',
      data: { order: '-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        data.results.forEach(app.renderMessage);
        $('option').not(`option:contains(${selection})`).remove(); //remove all rooms except for currently selected
        var roomnames = _.uniq(data.results.map(message => message.roomname));
        for (var room of roomnames) {
          if (room !== selection) {
            app.renderRoom(room, selection);
          }
        }
      },
      error: function (data) {
        console.error('chatterbox: Failed to fetch message', data);
      }
    });
  },
  server: 'http://parse.rpt.hackreactor.com/chatterbox/classes/messages',
  clearMessages: function() { $( '#chats' ).empty(); },
  renderMessage: function(message) {
    date = new Date (message.updatedAt);
    date = (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
    $('<div/>').appendTo('#chats');
    $('div').last().text(`${date} `);
    $('div').last().append('<span class = \'username\'></span><span class = \'text\'></span>');
    $('.username').last().text(`${message.username}`);
    $('.text').last().text(` ${message.text}`);
  },
  renderRoom: function(newRoom, selection) {
    // if(!newRoom){
    //   console.log('false');
    // }
    $('#roomSelect').last().append('<option/>');
    $('option').last().text(newRoom);
  },
  handleUsernameClick: function(event) {
    var friends = [];
    friends.push($(event.target).text());
    console.log('friend added');
  },
  handleSubmit: function(newMessage) {
    var message = {
      username: 'rmrmrm',
      text: 'trolley',
      roomname: '4chan'
    };
    message.text = newMessage;
    app.send(message);
    app.fetch();
  }
};

