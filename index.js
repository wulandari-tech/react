const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const authRouter = require('./routes/auth');
const chatRouter = require('./routes/chat');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api', authRouter);
app.use('/api', chatRouter);
app.use(express.static('client/public'));

// Socket.io
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sendMessage', (data) => {
    socket.broadcast.emit('newMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
