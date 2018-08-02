$(document).ready( () => {
  app.init();
  $('#send').submit(event => app.handleSubmit(event));
});
var selectedRoom, roomnames, isFirstTimeLoad;
var app = {
  init: function() {
    app.fetch();
    $('#roomSelect').on('change', () => app.fetch()); //why do I need do I need to write an arrow fcn for this? - but not for forEach
    $(document).on('click', '.username', event => app.handleUsernameClick(event));
  },
  send: function(message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: data => { console.log('success'); },
      error: data => {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  detectSelectedRoom: () => $( '#roomSelect option:selected' ).text(),
  fetch: function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      data: { order: '-createdAt'},
      contentType: 'application/json',
      success: function (data) {

        if (roomnames) {
          selectedRoom = app.detectSelectedRoom();
        }

        roomnames = _.uniq(data.results.map((message) => { if (message.roomname) { return message.roomname; } })); // all unique roomnames in an array except for undefined

        $('option').remove(); // delete all room options under #roomSelect so we can render from scratch in the drop down menu

        roomnames.forEach((room) => { app.renderRoom(room); }); // render each room in the drop down menu

        $('option').filter(function() { return $(this).text() === selectedRoom; }).attr('selected', 'selected'); //???why won't an arrow function work here?
        selectedRoom = app.detectSelectedRoom();
        app.clearMessages(); // Clear messages
        data.results.forEach((message) => { if (message.roomname === selectedRoom) { app.renderMessage(message); } }); // Send each message to renderMessage()
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
    date = date.getHours() + ':' + date.getMinutes();
    $('<div/>').text(`${date} `).appendTo('#chats'); // add message date
    $('<span class = \'username\'></span>').text(`${message.username}`).appendTo('#chats div:last') // add message username
      .after($('<span class = \'text\'></span>').text(` ${message.text}`)); // add message text
  },
  renderRoom: function(newRoom) {
    $('#roomSelect').last().append('<option/>');
    $('option').last().text(newRoom);
  },
  handleUsernameClick: function(event) {
    var friends = [];
    friends.push($(event.target).text());
    console.log('friend added');
  },
  handleSubmit: function(event) {
    app.clearMessages();
    selectedRoom = app.detectSelectedRoom();
    let message = {
      username: 'rmrmrm',
      text: $('#message').val(),
      roomname: selectedRoom
    };
    app.send(message);
    app.fetch();
    $('#send').trigger('reset');
    event.preventDefault();
  }
};

