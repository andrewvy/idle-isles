const initialState = {
  userChannel: null,
  chatChannel: null,
  userState: {}
}

const Channels = (state = initialState, action) => {
  const data = action.data

  switch (action.type) {
    case 'CHANNELS:USER:CONNECTED':
      return { ...state, userChannel: data }
    case 'CHANNELS:USER:NEW_MESSAGE':
      return { ...state, userState: data }
    default:
      return state
  }
}

export default Channels
