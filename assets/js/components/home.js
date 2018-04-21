import React from 'react'
import { connect } from 'react-redux'

import Actions from '~/actions'
import Chat from '~/components/chat'

import { Link } from 'react-router-dom'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.props.loadUser()
  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (!newProps.isLoadingUser && newProps.user !== null && !newProps.chat.isConnecting && newProps.chat.channel == null) {
      newProps.connectToChatChannel()
    }

    return {}
  }

  render() {
    if (this.props.isLoadingUser || this.props.user === null) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <div>
          Welcome {this.props.user.name}
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
}

const mapStateToProps = (state) => ({
  chat: state.Chat,
  isLoadingUser: state.App.isLoadingUser,
  user: state.App.user,
})

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(Actions.App.loadUser()),
  connectToChatChannel: () => dispatch(Actions.App.connectToChatChannel()),
  sendChatMessage: () => dispatch(Actions.Chat.sendChatMessage()),
  setMessageInput: (input) => dispatch(Actions.Chat.setMessageInput(input)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
