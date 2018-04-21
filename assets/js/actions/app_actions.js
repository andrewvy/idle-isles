import { createApiAction } from '~/lib/api'

import History from '~/lib/history'

import meQuery from '~/queries/me'
import loginQuery from '~/queries/login'
import registerQuery from '~/queries/register'
import { startChatChannel } from '~/lib/channels'

const toggleLoginModal = () => ({
  type: 'APP:HOME:TOGGLE_LOGIN_MODAL',
})

const submitLogin = (email, password) => ((dispatch, _) => {
  const apiAction = createApiAction('APP:HOME:LOGIN', loginQuery, {
    email,
    password,
  })

  dispatch(apiAction).then(() => {
    History.push('/home', {})
  })
})

const setLoginModalEmail = (email) => ({
  type: 'APP:HOME:SET_LOGIN_EMAIL',
  data: {
    email,
  },
})

const setLoginModalPassword = (password) => ({
  type: 'APP:HOME:SET_LOGIN_PASSWORD',
  data: {
    password,
  },
})

const setAuthToken = (token) => ({
  type: 'APP:SET_AUTH_TOKEN',
  data: {
    token,
  },
})

const logout = () => ((dispatch, _) => {
  const action = {
    type: 'APP:LOGOUT',
  }

  dispatch(action)

  History.push('/', {})
})

const connectToChatChannel = () => ((dispatch, getState) => {
  const authToken = getState().App.authToken
  const user = getState().App.user

  dispatch({
    type: 'APP:CHAT_CHANNEL:CONNECTING'
  })

  startChatChannel(dispatch, authToken, user)
})

const toggleRegistrationModal = () => ({
  type: 'APP:HOME:TOGGLE_REGISTRATION_MODAL',
})

const setRegistrationModalData = (attrs) => ({
  type: 'APP:HOME:SET_REGISTRATION_MODAL_DATA',
  data: attrs,
})

const submitRegistration = () => ((dispatch, getState) => {
  const registrationData = getState().App.registrationModal
  const { email, password, name } = registrationData

  const apiAction = createApiAction('APP:HOME:REGISTER', registerQuery, {
    email,
    password,
    name,
  })

  dispatch(apiAction).then(() => {
    dispatch(toggleRegistrationModal())
  })
})

const loadUser = () => ((dispatch, getState) => {
  const apiAction = createApiAction('APP:HOME:LOAD_USER', meQuery, {})

  dispatch(apiAction).catch(() => {
    History.push('/logout', {})
  })
})

export default {
  connectToChatChannel,
  loadUser,
  logout,
  setLoginModalEmail,
  setLoginModalPassword,
  setRegistrationModalData,
  submitLogin,
  submitRegistration,
  toggleLoginModal,
  toggleRegistrationModal,
}
