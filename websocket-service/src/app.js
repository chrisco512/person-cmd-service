const Server = require('socket.io');
const config = require('./config');
const bus = require('servicebus').bus({ url: `${config.servicebus.uri}?heartbeat=60` });


const io = new Server().attach(config.port);


io.on('connection', (socket) => {
  console.log(`CONNECTED: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`DISCONNECTED: ${socket.id}`);
  });

  socket.on('joinRoom', (roomName) => {
    console.log(`Joining: ${roomName}`);
    socket.join(roomName);
  });

  socket.on('leaveRoom', (roomName) => {
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


// function getSocketIds(io) {
//   return Object.keys(io.sockets.connected);
// }

if(config.emitEchoEvents) {
  setInterval( () => {
    // const socketId = Object.keys(io.sockets.connected)[0];
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

}
