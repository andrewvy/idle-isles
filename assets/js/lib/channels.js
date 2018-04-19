import { Socket } from 'phoenix'

const startChatChannel = (dispatch, authToken) => {
	let socket = new Socket("/socket", {
		logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }),
    params: {
      auth_token: authToken
    }
	})

  socket.connect()

  let channel = socket.channel('chat', {})

  channel.join()
    .receive("ok", () => {
      dispatch({
        type: 'APP:CHAT_CHANNEL:CONNECTED',
      })
    })
    .receive("error", () => {
      dispatch({
        type: 'APP:CHAT_CHANNEL:ERROR',
      })
    })

  channel.on('new:msg', msg => {
    dispatch({
      type: 'APP:CHAT_CHANNEL:MESSAGE',
      data: msg,
    })
  })
}

export {
  startChatChannel,
}
