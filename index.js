let app = require('express')()
let http = require('http').createServer(app)
let io = require('socket.io')(http)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
})

// This event will be fired on every new connection to socket
io.on('connection', function(socket){
  // Number of connections
  io.emit('connections',Object.keys(io.sockets.connected).length)

  // This event will be fired whenever the window will be closed/refreshed
  socket.on('disconnect', ()=>{
    io.emit('connections',Object.keys(io.sockets.connected).length)
  })

  // Listening event emmited from vue client
  socket.on('userLandedOnClient', (data) => {
    console.log('A user is landed to our watch video component')
	
		/*
    // Emiting event to all connected nodes
  	socket.emit('userReceivedByServer',data)
  	*/
  	
  	// Emiting event to all connected nodes leaving the one who is just connected
  	socket.broadcast.emit('userReceivedByServer',data)
  })

  socket.on('sendNewChatMessage',(data)=>{
  	socket.broadcast.emit('newChatMessageReceived',data)
  })

  socket.on('typing',(data)=>{
  	socket.broadcast.emit('typingAcknowledged',data)
  })

  socket.on('typingStopped',(data)=>{
  	socket.broadcast.emit('typingStoppedAcknowledged',data)
  })

  socket.on('newUserJoined',(data)=>{
  	socket.broadcast.emit('newUserJoinedAcknowledged',data)
  })

  socket.on('userLeft',(data)=>{
  	socket.broadcast.emit('userLeftAcknowledged',data)
  })

})

http.listen(3001, function(){
  console.log('listening on *:3001')
})