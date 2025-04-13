const CatchAsyncErrors = require('../middleware/CatchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');

exports.sendSingleMessage = CatchAsyncErrors(async (req, res, next) => {
  const { content, chatId } = req.body;
  
  if (!content || !chatId) {
    return next(new ErrorHandler('Missing fields', 400));
  }

  const chat = await Chat.findById(chatId);
  
  if (!chat) {
    return next(new ErrorHandler('Chat not found', 404));
  }

  const chatUsers = chat.users.map((user) => user.toString());
  if (!chatUsers.includes(req.user._id.toString())) {
    return next(
      new ErrorHandler('Cannot message in the chats you are not part of', 401)
    );
  }

  const newMessage = {
    sender: req.user._id,
    chat: chatId,
    content,
  };
  
  try {
    let message = await Message.create(newMessage);
    message = await message.populate('sender');
    message = await message.populate('chat');
    message = await User.populate(message, {
      path: 'chat.users',
    });
    
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });
    
    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    return next(new ErrorHandler('Error creating message', 500));
  }
});

exports.sendAllMessage = CatchAsyncErrors(async (req, res, next) => {
  try {
    // console.log('Fetching messages for chat ID:', req.params.id);
    
    if (!req.params.id) {
      // console.log('Chat ID is missing');
      return next(new ErrorHandler('Chat ID is required', 400));
    }

    const chat = await Chat.findById(req.params.id).populate('users');
    // console.log('Found chat:', chat);
    
    if (!chat) {
      // console.log('Chat not found for ID:', req.params.id);
      return next(new ErrorHandler('Chat not found', 404));
    }

    if (!chat.users || !Array.isArray(chat.users)) {
      // console.log('Chat users array is invalid:', chat.users);
      return next(new ErrorHandler('Invalid chat data', 500));
    }
    
    const chatUsers = chat.users.map(user => user._id ? user._id.toString() : user.toString());
    // console.log('Chat users:', chatUsers);
    // console.log('Current user:', req.user._id.toString());
    
    if (!chatUsers.includes(req.user._id.toString())) {
      // console.log('User not authorized for this chat');
      return next(
        new ErrorHandler('Cannot get messages of chats you are not part of', 401)
      );
    }
    
    let messages = await Message.find({ chat: req.params.id });
    // console.log('Raw messages found:', messages.length);

    // Populate messages one by one with error handling
    messages = await Promise.all(messages.map(async (message) => {
      try {
        const populatedMessage = await Message.findById(message._id)
          .populate('sender', 'name email pic')
          .populate({
            path: 'chat',
            select: 'chatName isGroupChat users',
            populate: {
              path: 'users',
              select: 'name email pic'
            }
          });
        return populatedMessage;
      } catch (err) {
        // console.error('Error populating message:', err);
        return message; // Return unpopulated message if population fails
      }
    }));

    // Filter out any null or undefined messages
    messages = messages.filter(message => message != null);
    
    // console.log('Populated messages found:', messages.length);
      
    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    // console.error('Error in sendAllMessage:', error);
    return next(new ErrorHandler(`Error fetching messages: ${error.message}`, 500));
  }
});
