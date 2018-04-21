import React from 'react'
import classnames from 'classnames'
import { preventDefault } from '~/lib/utils'

const LoginModal = ({
  loginModal,
  setLoginEmail,
  setLoginPassword,
  showLoginModal,
  submitLogin,
  toggleLoginModal,
}) => (
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
)

export default LoginModal
