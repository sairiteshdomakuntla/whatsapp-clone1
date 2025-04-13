export const setLocalStorage = (name, value) => {
  return localStorage.setItem(name, value);
};

export const getLocalStorage = (name) => {
  return localStorage.getItem(name);
};

export const getSender = (currentUser, users) => {
  if (!currentUser || !users || !users.length || users.length < 2) {
    return "Unknown";
  }
  return users[0]?._id === currentUser?.id ? users[1]?.name : users[0]?.name;
};

export const getSendersFullDetails = (currentUser, users) => {
  if (!currentUser || !users || !users.length || users.length < 2) {
    return null;
  }
  return users[0]?._id === currentUser?.id ? users[1] : users[0];
};

export const isSameSender = (
  messages,
  currentMessage,
  currentMessageIndex,
  currentUserId
) => {
  if (!messages || !currentMessage || !currentMessage.sender || currentMessageIndex === undefined) {
    return false;
  }

  return (
    currentMessageIndex < messages.length - 1 &&
    messages[currentMessageIndex + 1]?.sender?._id !==
      currentMessage.sender._id &&
    currentMessage.sender._id !== currentUserId
  );
};

export const isLastMessage = (messages, currentMessageIndex, currentUserId) => {
  if (!messages || !messages.length || currentMessageIndex === undefined) {
    return false;
  }

  const lastMessage = messages[messages.length - 1];
  return (
    currentMessageIndex === messages.length - 1 &&
    lastMessage?.sender?._id !== currentUserId &&
    lastMessage?.sender?._id
  );
};

export const isSameUser = (messages, currentMessage, currentMessageIndex) => {
  if (!messages || !currentMessage || !currentMessage.sender || currentMessageIndex <= 0) {
    return false;
  }

  return messages[currentMessageIndex - 1]?.sender?._id === currentMessage.sender._id;
};
