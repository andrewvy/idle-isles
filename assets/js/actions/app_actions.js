import { RSAA } from 'redux-api-middleware'

import loginQuery from '~/queries/login'

const toggleLoginModal = () => ({
  type: 'APP:HOME:TOGGLE_LOGIN_MODAL',
})

const submitLogin = (email, password) => ({
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

export default {
  toggleLoginModal,
  submitLogin,
  setLoginModalEmail,
  setLoginModalPassword,
}
