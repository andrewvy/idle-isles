import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'

import Actions from '~/actions'

import '~/components/app.css'

const preventDefault = (func) => (
  (e) => {
    e.preventDefault()
    func()
  }
)

const App = ({
  loginModal,
  setLoginEmail,
  setLoginPassword,
  showLoginModal,
  submitLogin,
  toggleLoginModal,
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
                <button className='button' onClick={preventDefault(toggleLoginModal)}>Log In</button>
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
                <input
                  className='input'
                  type='email'
                  placeholder='Email'
                  value={loginModal.email}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Password</label>
              <div className='control'>
                <input
                  className='input'
                  type='Password'
                  placeholder='Password'
                  value={loginModal.password}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
            </div>
            <div className='field is-grouped is-grouped-right'>
              <div className='control'>
                <button
                  className={classnames('button is-link', { 'is-loading': loginModal.isLoggingIn })}
                  onClick={preventDefault(() => submitLogin(loginModal.email, loginModal.password))}
                >
                  Submit
                </button>
              </div>
              <div className='control'>
                <button
                  className='button is-text'
                  onClick={preventDefault(toggleLoginModal)}
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
        onClick={preventDefault(toggleLoginModal)}
      />
    </div>
  </React.Fragment>
)

const mapStateToProps = (state) => ({
  loginModal: state.App.loginModal,
  showLoginModal: state.App.showLoginModal,
})

const mapDispatchToProps = (dispatch) => ({
  setLoginEmail: (email) => dispatch(Actions.App.setLoginModalEmail(email)),
  setLoginPassword: (password) => dispatch(Actions.App.setLoginModalPassword(password)),
  submitLogin: (email, password) => dispatch(Actions.App.submitLogin(email, password)),
  toggleLoginModal: () => dispatch(Actions.App.toggleLoginModal()),
})

App.propTypes = {
  loginModal: PropTypes.object.isRequired,
  setLoginEmail: PropTypes.func.isRequired,
  setLoginPassword: PropTypes.func.isRequired,
  submitLogin: PropTypes.func.isRequired,
  toggleLoginModal: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
