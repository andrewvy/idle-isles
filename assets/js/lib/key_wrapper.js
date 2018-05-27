import React from 'react'

const withKeys = (WrappedComponent: React.Component) => (
  class KeyWrapper extends React.Component {
    state = { keyEvent: null }

    handleKey = (e) => {
      this.setState({keyEvent: e})
    }

    componentDidMount() {
      window.document.addEventListener('keypress', this.handleKey)
    }

    componentWillUnmount() {
      window.document.removeEventListener('keypress', this.handleKey)
    }

    render() {
      return (
        <WrappedComponent {...this.props} keyEvent={this.state.keyEvent} />
      )
    }
  }
)

export default withKeys
