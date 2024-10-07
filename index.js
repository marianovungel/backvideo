require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para permitir CORS
app.use(cors());

// Criação do servidor HTTP
const server = require('http').createServer(app);

// Configuração do socket.io
const io = new Server(server);

io.on('connection', (socket) => {
    console.log("Server is connected");

    socket.on('join-room', (roomId, userId) => {
        console.log(`a new user ${userId} joined room ${roomId}`)
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connected', userId)
    })

    socket.on('user-toggle-audio', (userId, roomId) => {
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-toggle-audio', userId)
    })

    socket.on('user-toggle-video', (userId, roomId) => {
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-toggle-video', userId)
    })

    socket.on('user-leave', (userId, roomId) => {
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-leave', userId)
    })
});

// Inicia o servidor
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
