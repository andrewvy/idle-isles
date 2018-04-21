const initialState = {
  userChannel: null,
  chatChannel: null,
}

const Channels = (state = initialState, action) => {
  const data = action.data

  switch(action.type) {
    case 'CHANNELS:USER:CONNECTED':
      return { ...state, userChannel: data }
    default:
      return state
  }
}

export default Channels
