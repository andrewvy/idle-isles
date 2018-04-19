import React from 'react'
import { connect } from 'react-redux'

import Actions from '~/actions'

const Home = ({
  connectToChatChannel,
}) => {
  connectToChatChannel()

  return (
    <div>
      Home
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  connectToChatChannel: () => dispatch(Actions.App.connectToChatChannel())
})

export default connect(
  () => ({}),
  mapDispatchToProps,
)(Home)
