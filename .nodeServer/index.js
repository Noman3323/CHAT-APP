//Node server which will handle socket io connections
const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
         console.log("New user", name)
        users[socket.id]= name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

    // socket.on('disconnect', function (message) {
    //         socket.broadcast.emit('left', user[socket.id]);
    //         delete users[socket.id];
    socket.on('disconnect', () => {
        console.log("user", "users[socket.id]");
        if (users[socket.id]) {
            console.log("user", users[socket.id]);
            socket.broadcast.emit('user-left', users[socket.id]);
            delete users[socket.id]; 
        }
        });
})
   