// Node server to handle socket connections
const io = require('socket.io')(8000, {
    cors: {
      origin: "http://127.0.0.1:5500", // Allow your frontend origin
      methods: ["GET", "POST"], // Allow these HTTP methods
    },
  });
  
  const users = {};
  
  io.on('connection', socket => {
    // Handle new user joining
    socket.on('new-user-joined', name => {
      console.log("New user", name);
      users[socket.id] = name;
      socket.broadcast.emit('user-joined', name); // Notify others
    });
  
    // Handle message sending
    socket.on('send', message => {
      socket.broadcast.emit('receive', { message: message, name: users[socket.id] }); // Fixed typo in `users`
    });
  
    // Handle user disconnecting
    socket.on('disconnect', () => {
      const userName = users[socket.id];
      if (userName) {
        socket.broadcast.emit('user-left', userName); // Notify others
        delete users[socket.id]; // Remove user from the list
      }
    });
  });
  