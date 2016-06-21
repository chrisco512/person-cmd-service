const Server = require('socket.io');
const bus = require('servicebus').bus({ url: 'amqp://rabbit' + '?heartbeat=60' });


const io = new Server().attach(80);


io.on('connection', function(socket) {
  console.log(`CONNECTED: ${socket.id}`);

  socket.on('disconnect', function() {
    console.log(`DISCONNECTED: ${socket.id}`);
  });

  socket.on('joinRoom', function(roomName) {
    console.log(`Joining: ${roomName}`);
    socket.join(roomName);
  });

  socket.on('leaveRoom', function(roomName) {
    console.log(`Leaving: ${roomName}`);
    socket.leave(roomName);
  });

});


bus.subscribe('#', (event) => {
  	console.log('SOCKET SERVICE RECEIVED: ', event);
    if(!event.meta || !event.meta.socket) return;

    if(event.meta.socket.room) {
      io.to(event.meta.socket.room).emit('event', event);
    }

    // if(event.meta.socket.id) {
    //   io.broadcast.to(event.meta.socket.id).emit('event', event);
    // }
});


function getSocketIds(io) {
  return Object.keys(io.sockets.connected);
}


setInterval( () => {
  const socketId = Object.keys(io.sockets.connected)[0];
  const event = {
    type: 'ECHO',
    payload: {
      message: 'HELLO WORLD'
    },
    meta: {
      socket: {
        // id: socketId,
        room: 'dashboard'
      }
    }
  };
  bus.publish(event.type, event);
}, 30 * 1000);
