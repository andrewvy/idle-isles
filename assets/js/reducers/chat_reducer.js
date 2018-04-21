const initialState = {
  channel: null,
  messages: [],
  error: null,
  messageInput: '',
}

const Chat = (state = initialState, action) => {
  const data = action.data

  switch(action.type) {
    case 'CHAT:NEW_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages,
          data,
        ]
      }
    case 'CHAT:SEND_MESSAGE':
      if (Boolean(state.channel)) {
        state.channel.push('new:msg', {
          body: state.messageInput
        })
      }

      return { ...state, messageInput: '' }
    case 'CHAT:CONNECTED':
      return { ...state, channel: data }
    case 'CHAT:ERROR':
      return { ...state, error: 'Error connecting..' }
    case 'CHAT:SET_MESSAGE_INPUT':
      return { ...state, messageInput: data }
    default:
      return state
  }
}

export default Chat
