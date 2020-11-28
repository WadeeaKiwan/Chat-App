const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
