const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');
const path = require('path');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    // origin: 'http://localhost:3000'
    origin: 'https://chat-app-2021.herokuapp.com/'
  }
});

io.on('connection', (socket) => {
  console.log('We have a new connection!!!');

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` });

    socket.join(user.room);

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    console.log(getUsersInRoom(user.room));

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left!` });

      // Update the state of the users in the room
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }

    console.log('User had left!!!');
  })
});

app.use(router);
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next();
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../client/build'));

  app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html'));
  });
}

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
