var $chatFeed = $('.chat');
var recentMessageId;

var displayMessages = function(data) {
  console.log(data);
  var messages = data.results;
  var message;
  var i;

  // Eliminate previously displayed messages
  if (recentMessageId !== undefined) {
    for (i = 0; i < messages.length; i++) {
      if (messages[i].objectId === recentMessageId) {
        messages.splice(i, messages.length);
      }
    }
  }

  // add messages to document in reverse chronological order
  for (i = messages.length-1; i >= 0; i--) {
    message = messages[i];
    var $date = ($.format.date(message.createdAt, 'MMM d h:mm:ss p'));
    var $newMessage = $('<div class="message"></div>');
    $newMessage.html(
      '<div class="message-date">' + $date +
      '</div><div class="username">' + _.escape(message.username) +
      '</div><div class="message-text">' + _.escape(message.text) + '</div>');
    $newMessage.prependTo($chatFeed);
    recentMessageId = message.objectId;
  }
};


var errorHandler = function() {
  console.error('error');
};

// ajax fetch chat messages
var getMessages = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    success: displayMessages,
    error: errorHandler
  });
};

// Initialize feed and fetch messages every 1s
getMessages();
setInterval(getMessages, 1000);
