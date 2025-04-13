// load env-vars
require('dotenv').config();

// requiring dependencies
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const axios = require('axios');

// require db configs
const connectToDb = require('./config/db');

// initialize express
const app = express();

// requiring routers
const userRouter = require('./routes/userRouter');
const chatRouter = require('./routes/chatRouter');
const messageRouter = require('./routes/messageRouter');

// requiring middlewares
const errorMiddleware = require('./middleware/Error');

// requiring sockets event handlers
const socketEventHandler = require('./controllers/socketController');

// uncaught exception
process.on('uncaughtException', (err) => {
  // console.log(`Error: ${err.message}`);
  // console.log(`Server shutting down due to uncaught exception`);
  process.exit(1);
});

// connect to db
connectToDb();

// Request logging middleware
app.use((req, res, next) => {
  // console.log(`${req.method} ${req.url}`);
  next();
});

app.use(cors({
  origin: 'https://whatsapp-clone-lc1g.onrender.com', // Use the deployed frontend URL
  credentials: true
}));

// console.log(process.env.FRONTEND_URL);
app.use(express.json({ limit: '20mb' }));
app.use(cookieParser());

// using routers
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

// using other middlewares
app.use(errorMiddleware);

// deployment setup
if (process.env.NODE_ENV === 'production') {
  const __directory = path.resolve();
  app.use(express.static(path.join(__directory, '/client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__directory, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API service running 🚀');
  });
}

// starting server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// starting the socket
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: ['http://localhost:3000', process.env.FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
  },
});

// Add error handling for socket.io
io.on('connect_error', (err) => {
  // console.log(`Socket connection error: ${err.message}`);
});

io.on('error', (err) => {
  // console.log(`Socket error: ${err.message}`);
});

// listening events
io.on('connection', (socket) => {
  // console.log('New socket connection:', socket.id);
  socketEventHandler.handleSetup(socket);
  socketEventHandler.handleJoinChat(socket);
  socketEventHandler.handleMessage(socket);
  socketEventHandler.handleTyping(socket);
  
  socket.on('disconnect', () => {
    // console.log('Client disconnected:', socket.id);
  });
});

// unhandled promise rejection
process.on('unhandledRejection', (err) => {
  // console.log(`Error: ${err.message}`);
  // console.log(`Server shutting down due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});

