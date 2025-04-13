// import React from 'react';
// import ScrollableFeed from 'react-scrollable-feed';
// import { isSameSender, isSameUser, isLastMessage } from '../utils/helpers';
// import { useUserContext } from '../context/userContext';
// import { Avatar, Flex, Text, Tooltip } from '@chakra-ui/react';

// function ScrollableChat({ messages }) {
//   const { currentUser } = useUserContext();

//   if (!messages || !Array.isArray(messages)) {
//     console.log('No messages to display');
//     return null;
//   }

//   return (
//     <ScrollableFeed>
//       {messages.map((message, index) => {
//         if (!message || !message.sender || !message.content) {
//           console.log('Invalid message:', message);
//           return null;
//         }

//         const isSenderCurrentUser = message.sender._id === currentUser._id;

//         return (
//           <Flex
//   key={message._id || index}
//   width="100%"
//   justifyContent={isSenderCurrentUser ? "flex-end" : "flex-start"}
//   marginY="3px"
// >
//   {/* Avatar for non-current user messages */}
//   {!isSenderCurrentUser && (
//     <Tooltip label={message.sender?.name || "User"} placement="bottom-start">
//       <Avatar
//         mr={1}
//         size="sm"
//         cursor="pointer"
//         name={message.sender?.name || "User"}
//         src={message.sender?.avatar?.url}
//       />
//     </Tooltip>
//   )}
  
//   {/* Message bubble */}
//   <Flex
//     flexDirection="column"
//     bg={isSenderCurrentUser ? "#dcf8c6" : "white"} // WhatsApp green for sent messages
//     borderRadius="7.5px"
//     padding="6px 7px 8px 9px"
//     maxWidth="65%"
//     boxShadow="0 1px 0.5px rgba(11,20,26,.13)"
//     position="relative"
//   >
//     {/* Display sender name for group chats (optional) */}
//     {!isSenderCurrentUser && message.chat?.isGroupChat && (
//       <Text fontSize="13px" fontWeight="500" color="#1f7aec" mb="2px">
//         {message.sender.name}
//       </Text>
//     )}
    
//     {/* Message content */}
//     <Text 
//       wordBreak="break-word"
//       fontSize="14.2px"
//       lineHeight="19px"
//       color="rgb(17, 27, 33)"
//     >
//       {message.content}
//     </Text>
    
//     {/* Timestamp */}
//     <Text 
//       fontSize="11px" 
//       color="rgba(0, 0, 0, 0.45)" 
//       alignSelf="flex-end"
//       marginLeft="4px"
//       marginTop="2px"
//       display="inline-block"
//     >
//       {new Date(message.createdAt).toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: false
//       })}
//     </Text>
//   </Flex>
// </Flex>
//         );
//       })}
//     </ScrollableFeed>
//   );
// }

// export default ScrollableChat;




// import React from 'react';
// import ScrollableFeed from 'react-scrollable-feed';
// import { Box, Flex, Text } from '@chakra-ui/react';
// import { useUserContext } from '../context/userContext';

// function ScrollableChat({ messages }) {
//   const { currentUser } = useUserContext();

//   if (!messages || !Array.isArray(messages)) {
//     console.log('No messages to display');
//     return null;
//   }

//   return (
//     <ScrollableFeed>
//       {messages.map((message, index) => {
//         if (!message || !message.sender || !message.content) {
//           console.log('Invalid message:', message);
//           return null;
//         }

//         const isSentByMe = message.sender._id === currentUser._id;
        
//         return (
//           <Flex
//             key={message._id || index}
//             width="100%"
//             justifyContent={isSentByMe ? "flex-end" : "flex-start"}
//             my={2}
//             px={2}
//           >
//             <Box
//               maxWidth="75%"
//               bg={isSentByMe ? "#056162" : "#262d31"} // Dark theme colors
//               color="white"
//               borderRadius="7px"
//               p={2}
//               position="relative"
//               _before={{
//                 content: '""',
//                 position: "absolute",
//                 top: "0",
//                 [isSentByMe ? "right" : "left"]: "-7px",
//                 borderTop: "8px solid transparent",
//                 borderBottom: "8px solid transparent",
//                 [isSentByMe ? "borderRight" : "borderLeft"]: `8px solid ${isSentByMe ? "#056162" : "#262d31"}`,
//                 transform: isSentByMe ? "rotate(180deg)" : "rotate(0deg)",
//               }}
//             >
//               <Text
//                 fontSize="14px"
//                 wordBreak="break-word"
//                 paddingRight="50px" // Make space for timestamp
//               >
//                 {message.content}
//               </Text>
              
//               <Text
//                 position="absolute"
//                 bottom="2px"
//                 right="8px"
//                 fontSize="11px"
//                 color="rgba(255,255,255,0.6)"
//                 display="flex"
//                 alignItems="center"
//               >
//                 {new Date(message.createdAt).toLocaleTimeString([], {
//                   hour: '2-digit',
//                   minute: '2-digit',
//                   hour12: false
//                 })}
//                 {isSentByMe && (
//                   <Box as="span" ml={1} fontSize="16px">
//                     ✓
//                   </Box>
//                 )}
//               </Text>
//             </Box>
//           </Flex>
//         );
//       })}
//     </ScrollableFeed>
//   );
// }

// export default ScrollableChat;

// import React from 'react';
// import ScrollableFeed from 'react-scrollable-feed';
// import { isSameSender, isSameUser, isLastMessage } from '../utils/helpers';
// import { useUserContext } from '../context/userContext';
// import { Avatar, Box, Flex, HStack, Text, Tooltip } from '@chakra-ui/react';

// function ScrollableChat({ messages }) {
//   const { currentUser } = useUserContext();
  
//   return (
//     <ScrollableFeed>
//       {messages.map((message, index) => {
//         // Check if the message was sent by the current user
//         const isSentByMe = message.sender._id === currentUser.id;
        
//         return (
//           <Flex
//             key={index}
//             px="3" 
//             py="1"
//             mb="1"
//             justifyContent={isSentByMe ? 'flex-end' : 'flex-start'}
//             alignItems="flex-end"
//             width="100%"
//           >
//             {/* Show avatar only for messages not sent by the current user */}
//             {!isSentByMe && (isSameSender(messages, message, index, currentUser.id) ||
//               isLastMessage(messages, index, currentUser.id)) && (
//               <Tooltip label={message.sender.name} placement="bottom-start">
//                 <Avatar
//                   size="xs"
//                   mr="2"
//                   name={message.sender.name}
//                   src={message.sender.avatar?.url}
//                 />
//               </Tooltip>
//             )}
            
//             <Box
//               maxW="65%" 
//               bg={isSentByMe ? "#dcf8c6" : "white"}
//               p="2"
//               pb="4"
//               borderRadius="lg"
//               position="relative"
//               boxShadow="0px 1px 1px rgba(0, 0, 0, 0.08)"
//             >
//               <Text 
//                 fontSize="md" // Increased from "sm" to "md" for larger text
//                 pr="10"
//                 wordBreak="break-word"
//               >
//                 {message.content}
//               </Text>
              
//               <Text 
//                 position="absolute"
//                 right="2"
//                 bottom="1"
//                 fontSize="3xs" // Decreased from "2xs" to "3xs" for smaller timestamp
//                 color="gray.500"
//                 display="flex"
//                 alignItems="center"
//               >
//                 {new Date(message.createdAt).toLocaleTimeString([], {
//                   hour: '2-digit',
//                   minute: '2-digit',
//                   hour12: false
//                 })}
//                 {isSentByMe && (
//                   <Text ml="1" color="#53bdeb" fontSize="2xs">✓</Text> // Checkmark is slightly larger than timestamp
//                 )}
//               </Text>
//             </Box>
//           </Flex>
//         );
//       })}
//     </ScrollableFeed>
//   );
// }

// export default ScrollableChat;





import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { isSameSender, isLastMessage } from '../utils/helpers';
import { useUserContext } from '../context/userContext';
import { Avatar, Box, Flex, Text, Tooltip } from '@chakra-ui/react';

function ScrollableChat({ messages }) {
  const { currentUser } = useUserContext();
  
  return (
    <ScrollableFeed>
      {messages.map((message, index) => {
        // Check if the message was sent by the current user
        const isSentByMe = message.sender._id === currentUser.id;
        
        return (
          <Flex
            key={index}
            px="3" 
            py="1"
            mb="1"
            justifyContent={isSentByMe ? 'flex-end' : 'flex-start'}
            alignItems="flex-end"
            width="100%"
          >
            {/* Show avatar only for messages not sent by the current user */}
            {!isSentByMe && (isSameSender(messages, message, index, currentUser.id) ||
              isLastMessage(messages, index, currentUser.id)) && (
              <Tooltip label={message.sender.name} placement="bottom-start">
                <Avatar
                  size="xs"
                  mr="2"
                  name={message.sender.name}
                  src={message.sender.avatar?.url}
                />
              </Tooltip>
            )}
            
            <Box
              maxW="65%" 
              bg={isSentByMe ? "#dcf8c6" : "white"}
              p="2"
              borderRadius="lg"
              position="relative"
              boxShadow="0px 1px 1px rgba(0, 0, 0, 0.08)"
              display="flex"
              flexDirection="column"
            >
              <Text 
                fontSize="md"
                wordBreak="break-word"
              >
                {message.content}
              </Text>
              
              <Text 
                alignSelf="flex-end"
                fontSize="10px"
                color="gray.500"
                mt="1"
                display="flex"
                alignItems="center"
              >
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                })}
                {isSentByMe && (
                  <Text as="span" ml="1" color="#53bdeb">✓</Text>
                )}
              </Text>
            </Box>
          </Flex>
        );
      })}
    </ScrollableFeed>
  );
}

export default ScrollableChat;