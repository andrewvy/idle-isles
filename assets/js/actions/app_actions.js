import { RSAA } from 'redux-api-middleware'

import History from '~/lib/history'

import loginQuery from '~/queries/login'
import { startChatChannel } from '~/lib/channels'

const toggleLoginModal = () => ({
  type: 'APP:HOME:TOGGLE_LOGIN_MODAL',
})

const submitLogin = (email, password) => ((dispatch, _) => {
  const apiAction = {
    [RSAA]: {
      endpoint: '/api',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: loginQuery,
        variables: {
          email,
          password,
        },
      }),
      types: ['APP:HOME:LOGIN:REQUEST', 'APP:HOME:LOGIN:SUCCESS', 'APP:HOME:LOGIN:FAILURE']
    }
  }

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

  dispatch({
    type: 'APP:CHAT_CHANNEL:CONNECTING'
  })

  startChatChannel(dispatch, authToken)
})

export default {
  connectToChatChannel,
  logout,
  setLoginModalEmail,
  setLoginModalPassword,
  submitLogin,
  toggleLoginModal,
}
