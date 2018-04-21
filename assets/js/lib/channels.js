import { Socket } from 'phoenix'

import { chatConnected, chatError, newChatMessage } from '~/actions/chat_actions'

import {
  newUserMessage,
  userChannelConnecting,
  userChannelConnected,
  userChannelError
} from '~/actions/channels_actions'

const startChatChannel = (dispatch, authToken, user) => {
	let socket = new Socket("/socket", {
		logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }),
    params: {
      auth_token: authToken
    }
	})

  socket.connect()

  let chatChannel = socket.channel('chat', {})

  chatChannel.join()
    .receive("ok", () => {
      dispatch(
        chatConnected(chatChannel)
      )
    })
    .receive("error", () => {
      dispatch(
        chatError()
      )
    })

  chatChannel.on('new:msg', msg => {
    dispatch(
      newChatMessage(msg)
    )
  })

  let userChannel = socket.channel(`user:${user.id}`, {})

  dispatch(userChannelConnecting())

  userChannel.join()
    .receive("ok", () => {
      dispatch(
        userChannelConnected(userChannel)
      )
    })
    .receive("error", () => {
      dispatch(
        userChannelError()
      )
    })

  userChannel.on('tick', state => {
    dispatch(newUserMessage(state))
  })
}

export {
  startChatChannel,
}
