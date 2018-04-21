import React from 'react'

import { preventDefault } from '~/lib/utils'

const onKeyPress = sendChatMessage => e => {
  if (e.key === 'Enter') {
    sendChatMessage()
  }
}

const Chat = ({
  sendChatMessage,
  setMessageInput,
  chat,
}) => (
  <div>
    Chat
    <div className='container'>
      <table className='table'>
        <tbody>
          {
            chat.messages.map((message, i) => (
              <div key={i}>
                <span>{message.name}: </span>
                <span>{message.body}</span>
              </div>
            ))
          }
        </tbody>
      </table>
    </div>
    <div className='container'>
      <div className='field has-addons'>
        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='Message'
            value={chat.messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={onKeyPress(sendChatMessage)}
          />
        </div>
        <div className='control'>
          <button
            className='button'
            onClick={preventDefault(sendChatMessage)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default Chat
