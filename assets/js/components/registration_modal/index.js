import React from 'react'
import classnames from 'classnames'
import { preventDefault } from '~/lib/utils'

const RegistrationModal = ({
  registrationModal,
  toggleRegistrationModal,
  setRegistrationModalData,
  submitRegistration,
}) => (
  <div className={classnames('modal', { 'is-active': registrationModal.showRegistrationModal })}>
    <div className='modal-background'></div>
    <div className='modal-content'>
      <div className='box'>
        <form>
          <h1 className='title'>Register</h1>
          {
            Boolean(registrationModal.error) &&
            <article className='message is-danger'>
              <div className='message-header'>
                <p>Error</p>
              </div>
              <div className='message-body'>
                {registrationModal.error}
              </div>
            </article>
          }
          <div className='field'>
            <label className='label'>Username</label>
            <div className='control'>
              <input
                className='input'
                type='text'
                placeholder='Username'
                value={registrationModal.name}
                onChange={(e) => setRegistrationModalData({name: e.target.value})}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Email</label>
            <div className='control'>
              <input
                className='input'
                type='email'
                placeholder='Email'
                value={registrationModal.email}
                onChange={(e) => setRegistrationModalData({email: e.target.value})}
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
                value={registrationModal.password}
                onChange={(e) => setRegistrationModalData({password: e.target.value})}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Confirm Password</label>
            <div className='control'>
              <input
                className='input'
                type='Password'
                placeholder='Password'
              />
            </div>
          </div>
          <div className='field is-grouped is-grouped-right'>
            <div className='control'>
              <button
                className={classnames('button is-link', { 'is-loading': registrationModal.isRegistering })}
                onClick={preventDefault(() => submitRegistration())}
              >
                Submit
              </button>
            </div>
            <div className='control'>
              <button
                className='button is-text'
                onClick={preventDefault(toggleRegistrationModal)}
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
      onClick={preventDefault(toggleRegistrationModal)}
    />
  </div>
)

export default RegistrationModal
