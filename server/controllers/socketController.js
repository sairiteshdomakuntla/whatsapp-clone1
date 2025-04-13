let connectedUsers = new Map(); // Using Map for better user tracking

exports.handleSetup = (socket) => {
  socket.on('setup', (user) => {
    if (!user || !user._id) {
      // console.log('Invalid user data for socket setup:', user);
      return;
    }
    // console.log('User setup:', user._id);
    connectedUsers.set(user._id, socket.id);
    socket.user_id = user._id;
    socket.join(user._id);
    socket.emit('connected');
  });

  socket.on('disconnect', () => {
    if (socket.user_id) {
      // console.log('User disconnected:', socket.user_id);
      connectedUsers.delete(socket.user_id);
      if (socket.chat_id) {
        socket.to(socket.chat_id).emit('user_online_status', false);
      }
    }
  });
};

exports.handleJoinChat = (socket) => {
  socket.on('join_room', (chatId) => {
    if (!chatId) {
      // console.log('Invalid chat ID for join_room');
      return;
    }
    // console.log('User joining room:', chatId);
    socket.chat_id = chatId;
    socket.join(chatId);
  });

  socket.on('leave_room', (chatId) => {
    if (!chatId) return;
    // console.log('User leaving room:', chatId);
    socket.leave(chatId);
    socket.chat_id = null;
  });
};

exports.handleMessage = (socket) => {
  socket.on('new_message', (message) => {
    try {
      if (!message || !message.chat) {
        // console.log('Invalid message data:', message);
        return;
      }

      const chat = message.chat;
      // console.log('New message in chat:', chat._id);

      if (!chat.users || !Array.isArray(chat.users)) {
        // console.log('No users in chat or invalid users array');
        return;
      }

      // Broadcast to the chat room instead of individual users
      socket.to(chat._id).emit('new_message_recieved', message);
    } catch (error) {
      console.error('Error handling new message:', error);
    }
  });
};

exports.handleTyping = (socket) => {
  socket.on('typing', (chatId) => {
    if (!chatId) return;
    // console.log('User typing in chat:', chatId);
    socket.to(chatId).emit('typing');
  });

  socket.on('stop_typing', (chatId) => {
    if (!chatId) return;
    // console.log('User stopped typing in chat:', chatId);
    socket.to(chatId).emit('stop_typing');
  });
};
