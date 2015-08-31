
// ajax get all check on messages
var getMessages = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    success: function(data) {
      console.log('success');
      console.log(data);
    },
    error: function() {
      console.log('error');
    },
  });
};

getMessages();
