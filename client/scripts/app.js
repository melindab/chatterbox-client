var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',

  message: {},
  
  init: function() {
    $(".submit").click(function() {
      app.submit();
    });

    this.fetch();
    setInterval(this.refresh.bind(this), 3000);
  },

  send: function() {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(app.message),
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: Message sent');
        console.log(data);
      },
      error: function(data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  fetch: function() {
    $.ajax({
      url: this.server,
      type: 'GET',
      data: {order: '-createdAt'}, 
      contentType: 'application/json',
      success: function(data) {  // data is an array of objects:
      // createdAt: '2015-09-01T01:00:42.028Z'
      // objectId: 'hwhupXO0iX'
      // roomname: '4chan'
      // text: 'trololo'
      // updatedAt: '2015-09-01T01:00:42.028Z'
      // username: 'shawndrost'
        if ($('.messages').children().length > 0) {
          $('.messages').empty();  
        } 

        for (var i = 0; i < data.results.length; i++) {
          if (data.results[i].text) {
            var rm = _.escape(data.results[i].room) || "General";
            var user = _.escape(data.results[i].username);
            var txt = _.escape(data.results[i].text);

            $('.messages').append('<div>' + rm + ': ' + user + ': ' + txt + '</div>');           
          }
        }
      },
      error: function(data) {
        console.error('chatterbox: Failed to get message' + data.results);
      }
    });
  },

  refresh: function() {
    app.fetch();    
  },

  submit: function() {
    this.message.username = document.getElementById("username").value; 
    this.message.text = document.getElementById("message").value; 
    this.message.room = document.getElementById("room").value; 
    this.send();
  }

};

$(document).ready(function() {
  app.init();
});








