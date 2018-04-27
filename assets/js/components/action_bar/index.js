import React from 'react'
import classnames from 'classnames'

import './index.css'
import withKeys from '../../lib/key_wrapper'

const MAX_COOLDOWN_WIDTH = 48
const MIN_COOLDOWN_WIDTH = 0

const createCooldownWidth = percentage => {
  return `${(MAX_COOLDOWN_WIDTH * (percentage / 100))}px`
}

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  element.style.left = Math.min(progress / 10, 200) + 'px';
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

class ActionBarItem extends React.Component {
  constructor(props) {
    super(props)
    this.cooldownTimestamp = null
  }

  state = { active: false, inCooldown: false, cooldownPercentage: 0 }

  stepFunction = (timestamp) => {
    if (this.state.inCooldown && !this.cooldownTimestamp) {
      this.cooldownTimestamp = timestamp
    }

    if (this.state.inCooldown) {
      if (this.state.cooldownPercentage >= 100) {
        this.setState({
          inCooldown: false,
          cooldownPercentage: 0,
        })
      } else {
        this.setState({
          cooldownPercentage: this.state.cooldownPercentage + 3,
        })
      }
    }

    window.requestAnimationFrame(this.stepFunction)
  }

  componentDidMount() {
    window.requestAnimationFrame(this.stepFunction)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.active &&
        this.props.keyEvent &&
        this.props.keyEvent.code === this.props.actionKeyCode &&
        prevProps.keyEvent !== this.props.keyEvent) {

      setTimeout(() => {
        this.setState({
          active: false,
        })
      }, 100)

      this.setState({
        active: true,
        inCooldown: true
      })
    } else if (this.state.active && this.props.keyEvent && this.props.keyEvent.code !== prevProps.actionKeyCode) {
      this.setState({
        active: false,
      })
    }
  }

  render() {
    const style = {
      width: createCooldownWidth(this.state.cooldownPercentage)
    }

    return (
      <li className={classnames('action-bar-item', { 'is-active': this.state.active })}>
        <span className='key'>{this.props.keyDisplay}</span>
        <div className='cooldown' style={style}></div>
      </li>
    )
  }
}

const ActionBar = ({
  keyEvent,
}) => (
  <ul className='action-bar'>
    <ActionBarItem keyEvent={keyEvent} keyDisplay={'1'} actionKeyCode={'Digit1'}/>
    <ActionBarItem keyEvent={keyEvent} keyDisplay={'2'} actionKeyCode={'Digit2'}/>
    <ActionBarItem keyEvent={keyEvent} keyDisplay={'3'} actionKeyCode={'Digit3'}/>
    <ActionBarItem keyEvent={keyEvent} keyDisplay={'4'} actionKeyCode={'Digit4'}/>
    <ActionBarItem keyEvent={keyEvent} keyDisplay={'5'} actionKeyCode={'Digit5'}/>
    <ActionBarItem keyEvent={keyEvent} keyDisplay={'6'} actionKeyCode={'Digit6'}/>
    <ActionBarItem keyEvent={keyEvent} keyDisplay={'7'} actionKeyCode={'Digit7'}/>
    <ActionBarItem keyEvent={keyEvent} keyDisplay={'8'} actionKeyCode={'Digit8'}/>
    <ActionBarItem keyEvent={keyEvent} keyDisplay={'9'} actionKeyCode={'Digit9'}/>
    <ActionBarItem keyEvent={keyEvent} keyDisplay={'0'} actionKeyCode={'Digit0'}/>
  </ul>
)

export default withKeys(ActionBar)
