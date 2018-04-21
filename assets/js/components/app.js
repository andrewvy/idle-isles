import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import '~/components/app.css'
import Actions from '~/actions'
import LoginModal from '~/components/login_modal'
import RegistrationModal from '~/components/registration_modal'
import { preventDefault } from '~/lib/utils'

const App = ({
  loginModal,
  setLoginEmail,
  setLoginPassword,
  showLoginModal,
  submitLogin,
  toggleLoginModal,
  registrationModal,
  toggleRegistrationModal,
  setRegistrationModalData,
  submitRegistration,
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
                <button className='button' onClick={preventDefault(toggleRegistrationModal)}>Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <LoginModal
      loginModal={loginModal}
      setLoginEmail={setLoginEmail}
      setLoginPassword={setLoginPassword}
      showLoginModal={showLoginModal}
      submitLogin={submitLogin}
      toggleLoginModal={toggleLoginModal}
    />
    <RegistrationModal
      registrationModal={registrationModal}
      toggleRegistrationModal={toggleRegistrationModal}
      setRegistrationModalData={setRegistrationModalData}
      submitRegistration={submitRegistration}
    />
  </React.Fragment>
)

const mapStateToProps = (state) => ({
  loginModal: state.App.loginModal,
  registrationModal: state.App.registrationModal,
  showLoginModal: state.App.showLoginModal,
})

const mapDispatchToProps = (dispatch) => ({
  setLoginEmail: (email) => dispatch(Actions.App.setLoginModalEmail(email)),
  setLoginPassword: (password) => dispatch(Actions.App.setLoginModalPassword(password)),
  submitLogin: (email, password) => dispatch(Actions.App.submitLogin(email, password)),
  toggleLoginModal: () => dispatch(Actions.App.toggleLoginModal()),
  toggleRegistrationModal: () => dispatch(Actions.App.toggleRegistrationModal()),
  setRegistrationModalData: (attrs) => dispatch(Actions.App.setRegistrationModalData(attrs)),
  submitRegistration: () => dispatch(Actions.App.submitRegistration()),
})

App.propTypes = {
  loginModal: PropTypes.object.isRequired,
  setLoginEmail: PropTypes.func.isRequired,
  setLoginPassword: PropTypes.func.isRequired,
  submitLogin: PropTypes.func.isRequired,
  toggleLoginModal: PropTypes.func.isRequired,
  toggleRegistrationModal: PropTypes.func.isRequired,
  setRegistrationModalData: PropTypes.func.isRequired,
  submitRegistration: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
