$(document).ready( () => {
  app.init();
  $('#send').submit(event => app.handleSubmit(event));
});
var selectedRoom, roomnames, isFirstTimeLoad, newRoomName;
var friendList = [];
var app = {
  init: function() {
    app.fetch();
    $('#roomSelect').on('change', () => app.fetch()); // ????why do I need do I need to write an arrow fcn for this? - but not for forEach
    $(document).on('click', '.username', event => app.handleUsernameClick(event)); // event handler when a user is clicked
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
  createNewRoom: function() {
    app.clearMessages();
    newRoomName = prompt('New Chat Room Name:');
    let message = {
      roomname: newRoomName
    };
    app.send(message);
    app.fetch();
    console.log(newRoomName);
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

        $('option').filter(function() { return newRoomName ? $(this).text() === newRoomName : $(this).text() === selectedRoom; }).attr('selected', 'selected'); // set the drop down menu item to the selectedRoom (or if a newRoomName has just been created, set the drop down menu item to the newRoomName)

        newRoomName = undefined; // reset newRoomName variable so that when a user changes the drop down menu item - it will not default the menu item to the last newRoomName created

        selectedRoom = app.detectSelectedRoom();

        app.clearMessages(); // clear messages

        data.results.forEach((message) => { if (message.roomname === selectedRoom && message.text !== undefined ) { app.renderMessage(message); } }); // send each message with the selectedRoom to renderMessage() (except for messages with no text)

        $('.username').filter(function() { return friendList.indexOf($(this).text()) !== -1; }).css('font-weight', '900'); // apply css to all friends ???why won't an arrow function work here?
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
    friendList.push($(event.target).text());
    app.fetch();
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