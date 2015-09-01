var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  
  init: function() {
    //$(.messages).append('div').text() = JSON.parse(fetchedStuff).text;
    app.fetch();
    setInterval(app.refresh.bind(this), 3000);
  },

  send: function() {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: Message sent');
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
      //data: JSON.parse(messages), //message not defined
      contentType: 'application/json',
      success: function(data) {  // data is an array of objects:
      // createdAt: '2015-09-01T01:00:42.028Z'
      // objectId: 'hwhupXO0iX'
      // roomname: '4chan'
      // text: 'trololo'
      // updatedAt: '2015-09-01T01:00:42.028Z'
      // username: 'shawndrost'
        console.log(data.results);
        console.log(data.results[0]);
        console.log(data.results[0].text); //trololo
        console.log(data.results.length);
        if ($('.messages').children().length > 0) {
          $('.messages').empty();  
        } 

        for (var i = 0; i < data.results.length; i++) {
          if (data.results[i].text) {
            $('.messages').append('<div>' + data.results[i].username + ': ' + data.results[i].text + '</div>');           
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
    var message = {};
    //on click of submit button, create the message
    message.username = placeholder; // get text input in username box
    message.text = placeholder;   //get text in text box
    //this.roomname = placeholder; // get text in roomname box
    // send message
  }

};

app.init();

// var chat = {
//   username: 'me',
//   text: 'You are not alone.',
//   roomname: '4chan'
// };

//app.send();






