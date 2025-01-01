const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Setup Express and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (e.g., the client)
app.use(express.static('public'));

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages
    socket.on('chat message', (msg) => {
        console.log('Message received:', msg);
        // Broadcast message to all connected clients
        io.emit('chat message', msg);
    });

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
