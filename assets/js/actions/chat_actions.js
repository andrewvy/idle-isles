const newChatMessage = (message) => ({
  type: 'CHAT:NEW_MESSAGE',
  data: message
})

const sendChatMessage = () => ({
  type: 'CHAT:SEND_MESSAGE'
})

const setMessageInput = (input) => ({
  type: 'CHAT:SET_MESSAGE_INPUT',
  data: input
})

const chatConnected = (channel) => ({
  type: 'CHAT:CONNECTED',
  data: channel
})

const chatError = () => ({
  type: 'CHAT:ERROR'
})

export default {
  newChatMessage,
  sendChatMessage,
  setMessageInput,
  chatConnected,
  chatError
}

export {
  newChatMessage,
  sendChatMessage,
  setMessageInput,
  chatConnected,
  chatError
}
