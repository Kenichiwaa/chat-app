// http://socket.io/get-started/chat/

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = process.env.PORT || 3000;

// route user to index.html
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// establish connection to socket.io
io.on('connection', function(socket) {
  console.log('a user connected id: ' + socket.id );

  // when a user disconnects
  socket.on('disconnect', function(){
    console.log('user disconnected id: ' + socket.id);
  });

  socket.on('chat message', function(msg) {
    console.log('message : ' + msg + '/n userid: ' + msg.id);
    io.emit('chat message', msg);
  });

});

// connect to port
http.listen(PORT, function(){
  console.log('listening on *: ' + PORT);
});
