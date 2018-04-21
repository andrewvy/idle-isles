import { Socket } from 'phoenix'

import { chatConnected, chatError, newChatMessage } from '~/actions/chat_actions'

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
      dispatch(
        chatConnected(channel)
      )
    })
    .receive("error", () => {
      dispatch(
        chatError()
      )
    })

  channel.on('new:msg', msg => {
    dispatch(
      newChatMessage(msg)
    )
  })
}

export {
  startChatChannel,
}
