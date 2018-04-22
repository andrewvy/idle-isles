import React from 'react'
import { connect } from 'react-redux'

import Actions from '~/actions'

const Logout = ({
  performLogout
}) => {
  performLogout()

  return (
    <div>
      Logging out..
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  performLogout: () => dispatch(Actions.App.logout())
})

export default connect(
  () => ({}),
  mapDispatchToProps
)(Logout)
