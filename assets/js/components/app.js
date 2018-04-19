import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'

import Actions from '~/actions'

import '~/components/app.css'

const App = ({
  toggleLoginModal,
  showLoginModal,
}) => (
  <React.Fragment>
    <section className='hero is-primary is-fullheight'>
      <div className='hero-body'>
        <div className='container'>
          <h1 className='title'>
            Idle Isles
          </h1>
          <h2 className='subtitle'>
            Multiplayer Idle RPG
          </h2>
          <div className='level'>
            <div className='level-right'>
              <div className='level-item'>
                <button className='button' onClick={toggleLoginModal}>Log In</button>
              </div>
              <div className='level-item'>
                <button className='button'>Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className={classnames('modal', { 'is-active': showLoginModal })}>
      <div className='modal-background'></div>
      <div className='modal-content'>
        <div className='box'>
          <form>
            <h1 className='title'>Login</h1>
            <div className='field'>
              <label className='label'>Email</label>
              <div className='control'>
                <input className='input' type='email' placeholder='Email' />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Password</label>
              <div className='control'>
                <input className='input' type='Password' placeholder='Password' />
              </div>
            </div>
            <div className='field is-grouped is-grouped-right'>
              <div className='control'>
                <button
                  className='button is-link'
                  onClick={toggleLoginModal}
                >
                  Submit
                </button>
              </div>
              <div className='control'>
                <button
                  className='button is-text'
                  onClick={toggleLoginModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button
        className='modal-close is-large'
        aria-label='close'
        onClick={toggleLoginModal}
      />
    </div>
  </React.Fragment>
)

const mapStateToProps = (state) => ({
  showLoginModal: state.App.showLoginModal,
})

const mapDispatchToProps = (dispatch) => ({
  toggleLoginModal: () => dispatch(Actions.App.toggleLoginModal()),
})

App.propTypes = {
  toggleLoginModal: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
