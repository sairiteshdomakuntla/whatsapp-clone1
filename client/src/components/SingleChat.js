// import React, { useEffect, useState } from 'react';
// import { useChatContext } from '../context/chatContext';
// import { IoArrowBackOutline } from 'react-icons/io5';
// import { getSender, getSendersFullDetails } from '../utils/helpers';
// import { useUserContext } from '../context/userContext';
// import bcg2 from '../assets/bcg-2.png';
// import bcg from '../assets/bcg.png';
// import axios from 'axios';
// import io from 'socket.io-client';
// import {
//   ProfileModal,
//   SpinnerLoader,
//   UpdateGroupChatModal,
//   ScrollableChat,
// } from '.';
// import {
//   // Box,
//   Image,
//   IconButton,
//   Flex,
//   Text,
//   FormControl,
//   useToast,
//   VStack,
//   Avatar,
//   HStack,
//   Input,
//   // Tooltip,
// } from '@chakra-ui/react';

// let socket;
// let selectedChatBackup;
// // let timeout;

// function SingleChat() {
//   const { currentUser } = useUserContext();
//   const {
//     selectedChat,
//     notification,
//     setSelectedChat,
//     setNotification,
//     setFetchFlag,
//   } = useChatContext();
//   const [socketConnected, setSocketConnected] = useState(false);
//   // const [onlineStatus, setOnlineStatus] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [typing, setTyping] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const toast = useToast();

//   const canType = () => {
//     if (!selectedChat) return false;
//     if (!selectedChat.isSpecialGroup) return true;
    
//     // console.log('Current user interest:', currentUser?.interest);
//     // console.log('Is special group:', selectedChat.isSpecialGroup);
    
//     const isPlayer = currentUser?.interest === "Playing Cricket";
//     // console.log('Is player:', isPlayer);
    
//     if (selectedChat.isSpecialGroup && !isPlayer) {
//       // console.log('User cannot type in special group - not a player');
//       return false;
//     }
    
//     return true;
//   };

//   const fetchMessages = async () => {
//     if (!selectedChat) return;
    
//     try {
//       setLoading(true);
//       const response = await axios.get(`/api/message/${selectedChat._id}`);
//       // console.log('Fetched messages response:', response.data);
      
//       if (!response.data || !response.data.data) {
//         throw new Error('Invalid response format');
//       }
      
//       const messages = response.data.data;
//       if (!Array.isArray(messages)) {
//         throw new Error('Messages is not an array');
//       }
      
//       setMessages(messages);
//       setLoading(false);
//       socket.emit('join_room', selectedChat._id);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       toast({
//         title: "Error Occurred!",
//         description: error.message || "Failed to fetch messages",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setMessages([]);
//       setLoading(false);
//     }
//   };

//   const sendMessage = async (event) => {
//     const canUserType = canType();
//     // console.log('Can user type before sending:', canUserType);
    
//     if (event.key === "Enter" && newMessage && canUserType) {
//       socket.emit("stop typing", selectedChat._id);
//       try {
//         const config = {
//           headers: {
//             "Content-type": "application/json",
//           },
//         };
//         setNewMessage("");
//         const response = await axios.post(
//           "/api/message",
//           {
//             content: newMessage,
//             chatId: selectedChat._id
//           },
//           config
//         );
        
//         // console.log('Send message response:', response.data);
        
//         if (!response.data || !response.data.data) {
//           throw new Error('Invalid response format');
//         }
        
//         const message = response.data.data;
//         socket.emit("new message", message);
//         setMessages(prev => {
//           if (!prev) return [message];
//           return [...prev, message];
//         });
//       } catch (error) {
//         console.error('Error sending message:', error);
//         toast({
//           title: "Error Occurred!",
//           description: error.message || "Failed to send the Message",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//         });
//       }
//     }
//   };

//   const typingHandler = (e) => {
//     const canUserType = canType();
//     // console.log('Can user type:', canUserType);
    
//     if (!canUserType) return;
    
//     setNewMessage(e.target.value);

//     if (!socketConnected) return;

//     if (!typing) {
//       setTyping(true);
//       socket.emit("typing", selectedChat._id);
//     }
//     let lastTypingTime = new Date().getTime();
//     var timerLength = 3000;
//     setTimeout(() => {
//       var timeNow = new Date().getTime();
//       var timeDiff = timeNow - lastTypingTime;
//       if (timeDiff >= timerLength && typing) {
//         socket.emit("stop typing", selectedChat._id);
//         setTyping(false);
//       }
//     }, timerLength);
//   };

//   useEffect(() => {
//     if (!currentUser) return;

//     // Create socket instance
//     socket = io(process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : process.env.REACT_APP_PROJECT_URL, {
//       withCredentials: true,
//       transports: ['polling', 'websocket'], // Try polling first, then upgrade to websocket
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//       timeout: 20000,
//     });

//     // Connection events
//     socket.on('connect', () => {
//       // console.log('Socket connected with ID:', socket.id);
//       setSocketConnected(true);
//       socket.emit('setup', currentUser);
//     });

//     socket.on('connected', () => {
//       console.log('Socket setup completed');
//     });

//     socket.on('connect_error', (error) => {
//       console.error('Socket connection error:', error);
//       setSocketConnected(false);
//       toast({
//         title: "Connection Error",
//         description: "Trying to reconnect to chat server...",
//         status: "warning",
//         duration: 3000,
//         isClosable: true,
//         position: "bottom",
//       });
//     });

//     socket.on('disconnect', (reason) => {
//       // console.log('Socket disconnected:', reason);
//       setSocketConnected(false);
//     });

//     socket.on('reconnect', (attemptNumber) => {
//       // console.log('Socket reconnected after', attemptNumber, 'attempts');
//       setSocketConnected(true);
//       if (selectedChat) {
//         socket.emit('join_room', selectedChat._id);
//       }
//     });

//     // Chat events
//     socket.on('typing', () => setIsTyping(true));
//     socket.on('stop_typing', () => setIsTyping(false));
    
//     socket.on('new_message_recieved', (message) => {
//       // console.log('New message received:', message);
      
//       if (!message || !message.chat || !message.sender) {
//         // console.error('Invalid message format:', message);
//         return;
//       }

//       if (!selectedChatBackup || selectedChatBackup._id !== message.chat._id) {
//         if (!notification?.includes(message)) {
//           setNotification(prev => {
//             if (!prev) return [message];
//             return [message, ...prev];
//           });
//           setFetchFlag(prev => !prev);
//         }
//       } else {
//         setMessages(prev => {
//           if (!prev) return [message];
//           const newMessages = [...prev];
//           if (!newMessages.some(m => m._id === message._id)) {
//             newMessages.push(message);
//           }
//           return newMessages;
//         });
//       }
//     });

//     // Cleanup
//     return () => {
//       // console.log('Cleaning up socket connection');
//       if (socket) {
//         if (selectedChat) {
//           socket.emit('leave_room', selectedChat._id);
//         }
//         socket.off('connect');
//         socket.off('connected');
//         socket.off('connect_error');
//         socket.off('disconnect');
//         socket.off('reconnect');
//         socket.off('typing');
//         socket.off('stop_typing');
//         socket.off('new_message_recieved');
//         socket.disconnect();
//       }
//     };
//   }, [currentUser]);

//   useEffect(() => {
//     if (selectedChat && socketConnected) {
//       // console.log('Joining chat room:', selectedChat._id);
//       socket.emit('join_room', selectedChat._id);
//       fetchMessages();
//       selectedChatBackup = selectedChat;
//     }
//     return () => {
//       if (selectedChat && socket) {
//         // console.log('Leaving chat room:', selectedChat._id);
//         socket.emit('leave_room', selectedChat._id);
//       }
//     };
//   }, [selectedChat, socketConnected]);

//   const isTypingAllowed = () => {
//     if (!selectedChat?.isSpecialGroup) {
//       return true;
//     }
    
//     return currentUser?.interest === "Playing Cricket";
//   };

//   return (
//     <Flex flexDirection='column' w='100%'>
//       {selectedChat ? (
//         <>
//           <Flex
//             p='4'
//             bg='gray.100'
//             justifyContent='space-between'
//             alignItems='center'
//             shadow='sm'
//           >
//             <IconButton
//               icon={<IoArrowBackOutline />}
//               d={{ base: 'flex', md: 'none' }}
//               onClick={() => setSelectedChat(null)}
//             />
//             {!selectedChat.isGroupChat ? (
//               <>
//                 <HStack spacing='4'>
//                   <Avatar
//                     size='md'
//                     name={getSender(currentUser, selectedChat.users)}
//                     src={getSendersFullDetails(currentUser, selectedChat.users).avatar.url}
//                   />
//                   <VStack spacing='0' alignItems='flex-start'>
//                     <Text>{getSender(currentUser, selectedChat.users)}</Text>
//                     {isTyping ? (
//                       <Text fontSize='sm' color='gray.500'>typing...</Text>
//                     ) : null}
//                   </VStack>
//                 </HStack>
//                 <ProfileModal user={getSendersFullDetails(currentUser, selectedChat.users)} />
//               </>
//             ) : (
//               <>
//                 <HStack spacing='4'>
//                   <Avatar size='md' name={selectedChat.chatName} />
//                   <VStack spacing='0' alignItems='flex-start'>
//                     <Text>{selectedChat.chatName}</Text>
//                     {isTyping && (
//                       <Text fontSize='sm' color='gray.500'>typing...</Text>
//                     )}
//                   </VStack>
//                 </HStack>
//                 {!selectedChat.isSpecialGroup && <UpdateGroupChatModal fetchMessages={fetchMessages} />}
//               </>
//             )}
//           </Flex>
//           <Flex
//             flexDirection='column'
//             justifyContent='flex-end'
//             p='3'
//             bg={`url(${bcg})`}
//             w='100%'
//             h='100%'
//             overflowY='hidden'
//           >
//             {loading ? (
//               <SpinnerLoader size='xl' margin='auto' alignSelf='center' />
//             ) : (
//               <Flex flexDirection='column' overflowY='auto'>
//                 <ScrollableChat messages={messages} />
//               </Flex>
//             )}
//             <FormControl
//               onKeyDown={sendMessage}
//               id="first-name"
//               isRequired
//               mt={3}
//               isDisabled={!isTypingAllowed()}
//             >
//               {!isTypingAllowed() && selectedChat?.isSpecialGroup && (
//                 <Text color="red.500" mb={2}>
//                   Only players can send messages in the Cricket Community group
//                 </Text>
//               )}
//               <Input
//                 variant="filled"
//                 bg="#E0E0E0"
//                 placeholder={
//                   !isTypingAllowed() && selectedChat?.isSpecialGroup
//                     ? "Only players can send messages in this group"
//                     : "Enter a message.."
//                 }
//                 value={newMessage}
//                 onChange={typingHandler}
//                 disabled={!isTypingAllowed()}
//               />
//             </FormControl>
//           </Flex>
//         </>
//       ) : (
//         <Flex
//           alignItems='center'
//           justifyContent='center'
//           h='100%'
//           flexDirection='column'
//           bg='gray.100'
//         >
//           <Image src={bcg2} boxSize='300px' />
//           <Text fontSize='3xl' pb='3'>
//             Select a chat to start messaging
//           </Text>
//         </Flex>
//       )}
//     </Flex>
//   );
// }

// export default SingleChat;



import React, { useEffect, useState, useCallback } from 'react';
import { useChatContext } from '../context/chatContext';
import { IoArrowBackOutline } from 'react-icons/io5';
import { getSender, getSendersFullDetails } from '../utils/helpers';
import { useUserContext } from '../context/userContext';
import bcg2 from '../assets/bcg-2.png';
import bcg from '../assets/bcg.png';
import axios from 'axios';
import io from 'socket.io-client';
import {
  ProfileModal,
  SpinnerLoader,
  UpdateGroupChatModal,
  ScrollableChat,
} from '.';
import {
  IconButton,
  Flex,
  Text,
  FormControl,
  useToast,
  VStack,
  Avatar,
  HStack,
  Input,
  Image,
} from '@chakra-ui/react';

let socket;
let selectedChatBackup;

function SingleChat() {
  const { currentUser } = useUserContext();
  const {
    selectedChat,
    notification,
    setSelectedChat,
    setNotification,
    setFetchFlag,
  } = useChatContext();
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const canType = () => {
    if (!selectedChat) return false;
    if (!selectedChat.isSpecialGroup) return true;
    
    const isPlayer = currentUser?.interest === "Playing Cricket";
    
    if (selectedChat.isSpecialGroup && !isPlayer) {
      return false;
    }
    
    return true;
  };

  const fetchMessages = useCallback(async () => {
    if (!selectedChat) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`/api/message/${selectedChat._id}`);
      
      if (!response.data || !response.data.data) {
        throw new Error('Invalid response format');
      }
      
      const messages = response.data.data;
      if (!Array.isArray(messages)) {
        throw new Error('Messages is not an array');
      }
      
      setMessages(messages);
      setLoading(false);
      socket.emit('join_room', selectedChat._id);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error Occurred!",
        description: error.message || "Failed to fetch messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setMessages([]);
      setLoading(false);
    }
  }, [selectedChat, toast]);

  const sendMessage = async (event) => {
    const canUserType = canType();
    
    if (event.key === "Enter" && newMessage && canUserType) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setNewMessage("");
        const response = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id
          },
          config
        );
        
        if (!response.data || !response.data.data) {
          throw new Error('Invalid response format');
        }
        
        const message = response.data.data;
        socket.emit("new message", message);
        setMessages(prev => {
          if (!prev) return [message];
          return [...prev, message];
        });
      } catch (error) {
        console.error('Error sending message:', error);
        toast({
          title: "Error Occurred!",
          description: error.message || "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const typingHandler = (e) => {
    const canUserType = canType();
    
    if (!canUserType) return;
    
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    if (!currentUser) return;

    // Create socket instance
    socket = io(process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : process.env.REACT_APP_PROJECT_URL, {
      withCredentials: true,
      transports: ['polling', 'websocket'], // Try polling first, then upgrade to websocket
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    // Connection events
    socket.on('connect', () => {
      setSocketConnected(true);
      socket.emit('setup', currentUser);
    });

    socket.on('connected', () => {
      console.log('Socket setup completed');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setSocketConnected(false);
      toast({
        title: "Connection Error",
        description: "Trying to reconnect to chat server...",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    });

    socket.on('disconnect', (reason) => {
      setSocketConnected(false);
    });

    socket.on('reconnect', (attemptNumber) => {
      setSocketConnected(true);
      if (selectedChat) {
        socket.emit('join_room', selectedChat._id);
      }
    });

    // Chat events
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop_typing', () => setIsTyping(false));
    
    socket.on('new_message_recieved', (message) => {
      if (!message || !message.chat || !message.sender) {
        return;
      }

      if (!selectedChatBackup || selectedChatBackup._id !== message.chat._id) {
        if (!notification?.includes(message)) {
          setNotification(prev => {
            if (!prev) return [message];
            return [message, ...prev];
          });
          setFetchFlag(prev => !prev);
        }
      } else {
        setMessages(prev => {
          if (!prev) return [message];
          const newMessages = [...prev];
          if (!newMessages.some(m => m._id === message._id)) {
            newMessages.push(message);
          }
          return newMessages;
        });
      }
    });

    // Cleanup
    return () => {
      if (socket) {
        if (selectedChat) {
          socket.emit('leave_room', selectedChat._id);
        }
        socket.off('connect');
        socket.off('connected');
        socket.off('connect_error');
        socket.off('disconnect');
        socket.off('reconnect');
        socket.off('typing');
        socket.off('stop_typing');
        socket.off('new_message_recieved');
        socket.disconnect();
      }
    };
  }, [currentUser, notification, selectedChat, setFetchFlag, setNotification, toast]);

  useEffect(() => {
    if (selectedChat && socketConnected) {
      socket.emit('join_room', selectedChat._id);
      fetchMessages();
      selectedChatBackup = selectedChat;
    }
    return () => {
      if (selectedChat && socket) {
        socket.emit('leave_room', selectedChat._id);
      }
    };
  }, [selectedChat, socketConnected, fetchMessages]);

  const isTypingAllowed = () => {
    if (!selectedChat?.isSpecialGroup) {
      return true;
    }
    
    return currentUser?.interest === "Playing Cricket";
  };

  return (
    <Flex flexDirection='column' w='100%'>
      {selectedChat ? (
        <>
          <Flex
            p='4'
            bg='gray.100'
            justifyContent='space-between'
            alignItems='center'
            shadow='sm'
          >
            <IconButton
              icon={<IoArrowBackOutline />}
              d={{ base: 'flex', md: 'none' }}
              onClick={() => setSelectedChat(null)}
            />
            {!selectedChat.isGroupChat ? (
              <>
                <HStack spacing='4'>
                  <Avatar
                    size='md'
                    name={getSender(currentUser, selectedChat.users)}
                    src={getSendersFullDetails(currentUser, selectedChat.users).avatar.url}
                  />
                  <VStack spacing='0' alignItems='flex-start'>
                    <Text>{getSender(currentUser, selectedChat.users)}</Text>
                    {isTyping ? (
                      <Text fontSize='sm' color='gray.500'>typing...</Text>
                    ) : null}
                  </VStack>
                </HStack>
                <ProfileModal user={getSendersFullDetails(currentUser, selectedChat.users)} />
              </>
            ) : (
              <>
                <HStack spacing='4'>
                  <Avatar size='md' name={selectedChat.chatName} />
                  <VStack spacing='0' alignItems='flex-start'>
                    <Text>{selectedChat.chatName}</Text>
                    {isTyping && (
                      <Text fontSize='sm' color='gray.500'>typing...</Text>
                    )}
                  </VStack>
                </HStack>
                {!selectedChat.isSpecialGroup && <UpdateGroupChatModal fetchMessages={fetchMessages} />}
              </>
            )}
          </Flex>
          <Flex
            flexDirection='column'
            justifyContent='flex-end'
            p='3'
            bg={`url(${bcg})`}
            w='100%'
            h='100%'
            overflowY='hidden'
          >
            {loading ? (
              <SpinnerLoader size='xl' margin='auto' alignSelf='center' />
            ) : (
              <Flex flexDirection='column' overflowY='auto'>
                <ScrollableChat messages={messages} />
              </Flex>
            )}
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
              isDisabled={!isTypingAllowed()}
            >
              {!isTypingAllowed() && selectedChat?.isSpecialGroup && (
                <Text color="red.500" mb={2}>
                  Only players can send messages in the Cricket Community group
                </Text>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder={
                  !isTypingAllowed() && selectedChat?.isSpecialGroup
                    ? "Only players can send messages in this group"
                    : "Enter a message.."
                }
                value={newMessage}
                onChange={typingHandler}
                disabled={!isTypingAllowed()}
              />
            </FormControl>
          </Flex>
        </>
      ) : (
        <Flex
          alignItems='center'
          justifyContent='center'
          h='100%'
          flexDirection='column'
          bg='gray.100'
        >
          <Image src={bcg2} boxSize='300px' />
          <Text fontSize='3xl' pb='3'>
            Select a chat to start messaging
          </Text>
        </Flex>
      )}
    </Flex>
  );
}

export default SingleChat;