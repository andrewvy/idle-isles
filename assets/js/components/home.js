import React from 'react'
import { connect } from 'react-redux'

import Actions from '~/actions'
import Chat from '~/components/chat'

import { Link } from 'react-router-dom'

class Home extends React.Component {
  componentDidMount() {
    this.props.connectToChatChannel()
  }

  render() {
    return (
      <div>
        Home
        <Chat
          sendChatMessage={this.props.sendChatMessage}
          chat={this.props.chat}
          setMessageInput={this.props.setMessageInput}
        />
        <Link to='/logout'>Log Out</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  chat: state.Chat,
})

const mapDispatchToProps = (dispatch) => ({
  connectToChatChannel: () => dispatch(Actions.App.connectToChatChannel()),
  sendChatMessage: () => dispatch(Actions.Chat.sendChatMessage()),
  setMessageInput: (input) => dispatch(Actions.Chat.setMessageInput(input)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
