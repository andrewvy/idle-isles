const newUserMessage = data => ({
  type: 'CHANNELS:USER:NEW_MESSAGE',
  data,
})

const userChannelConnecting = () => ({
  type: 'CHANNELS:USER:CONNECTING',
})

const userChannelConnected = (channel) => ({
  type: 'CHANNELS:USER:CONNECTED',
  data: channel,
})

const userChannelError = (error) => ({
  type: 'CHANNELS:USER:ERROR',
  data: error
})

export default {
  newUserMessage,
  userChannelConnecting,
  userChannelConnected,
  userChannelError,
}

export {
  newUserMessage,
  userChannelConnecting,
  userChannelConnected,
  userChannelError,
}
