$(document).ready( () => app.init() );
var app = {
  init: function() {
    var selected = $( '#roomSelect option:selected' ).text();
    // app.fetch(selected); //wtf - this breaks first event mocha test
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
    $('#send').on('submit', function(event) { //NEEDS TO BE #send .submit instead of just #send for mocha test
      event.preventDefault();
      var message = $('#message').val();
      app.handleSubmit(message);
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
        console.log('success');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function(selection) {
    app.clearMessages();
    $.ajax({
      url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: { order: '-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        app.clearMessages();
        data.results.forEach(app.renderMessage);
        $('option').not(`option:contains(${selection})`).remove(); //remove all rooms except for currently selected
        var roomnames = _.uniq(data.results.map(message => message.roomname));
        for (var room of roomnames) {
          if (room != selection) {
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
  clearMessages: function() {
    $( '#chats' ).empty();
  },
  renderMessage: function(message) {
    date = new Date (message.updatedAt);
    date = (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
    $('<p class = \'fetchedMessage\'></p>').appendTo('#chats'); //add 'fetchedMessage' class to #chats
    $('.fetchedMessage').last().text(function() { //find last 'fetchedMessage' class and add the date
      return `${date} `;
    });
    $('.fetchedMessage').last().append('<span class = \'username\'></span><span class = \'text\'></span>'); //find last 'fetchedMessage' class and add the username class
    $('.username').last().text(function() {
      return message.username; //add the username
    });
    $('.text').last().text(function() {
      return JSON.stringify(message.text); //add the message text
    });
  },
  renderRoom: function(newRoom, selection) {
    // if(!newRoom){
    //   console.log('false');
    // }
    $('#roomSelect').last().append('<option></option>');
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



