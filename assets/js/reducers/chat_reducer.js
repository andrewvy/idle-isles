import CircularBuffer from '~/lib/circular_buffer'

const initialState = {
  isConnecting: false,
  channel: null,
  messages: new CircularBuffer(15),
  error: null,
  messageInput: ''
}

const Chat = (state = initialState, action) => {
  const data = action.data

  switch (action.type) {
    case 'CHAT:NEW_MESSAGE':
      return {
        ...state,
        messages: state.messages.push(data)
      }
    case 'CHAT:SEND_MESSAGE':
      if (state.channel) {
        state.channel.push('new:msg', {
          body: state.messageInput
        })
      }

      return { ...state, messageInput: '' }
    case 'APP:CHAT_CHANNEL:CONNECTING':
      return { ...state, isConnecting: true }
    case 'CHAT:CONNECTED':
      return { ...state, channel: data, isConnecting: false }
    case 'CHAT:ERROR':
      return { ...state, error: 'Error connecting..', isConnecting: false }
    case 'CHAT:SET_MESSAGE_INPUT':
      return { ...state, messageInput: data }
    default:
      return state
  }
}

export default Chat
