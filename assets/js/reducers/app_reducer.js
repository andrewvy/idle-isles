const getAuthToken = () => {
  if (window.localStorage) {
    return window.localStorage.getItem('auth_token')
  } else {
    return null
  }
}

const setAuthToken = (state, token) => {
  if (window.localStorage) {
    window.localStorage.setItem('auth_token', token)
  }

  return { ...state, authToken: token }
}

const clearAuthToken = (state) => {
  if (window.localStorage) {
    window.localStorage.removeItem('auth_token', null)
  }

  return { ...state, authToken: null }
}

const initialState = {
  user: {},
  isLoggedIn: false,
  showLoginModal: false,
  loginModal: {
    email: '',
    password: '',
    isLoggingIn: false,
  },
  authToken: getAuthToken(),
}

const App = (state = initialState, action) => {
  const data = action.data

  switch(action.type) {
    case 'APP:HOME:TOGGLE_LOGIN_MODAL':
      return { ...state, showLoginModal: !state.showLoginModal }
    case 'APP:HOME:SET_LOGIN_EMAIL':
      return { ...state, loginModal: { ...state.loginModal, email: data.email } }
    case 'APP:HOME:SET_LOGIN_PASSWORD':
      return { ...state, loginModal: { ...state.loginModal, password: data.password } }
    case 'APP:HOME:LOGIN:REQUEST':
      return { ...state, loginModal: { ...state.loginModal, isLoggingIn: true } }
    case 'APP:HOME:LOGIN:SUCCESS':
      return setAuthToken({
        ...state,
        loginModal: {
          ...state.loginModal,
          isLoggingIn: false
        }
      }, action.payload.data.login.token)
    case 'APP:HOME:LOGIN:FAILURE':
      return { ...state, loginModal: { ...state.loginModal, isLoggingIn: false } }
    case 'APP:SET_AUTH_TOKEN':
      return setAuthToken(state, data.token)
    case 'APP:LOGOUT':
      return clearAuthToken(state)
    default:
      return state
  }
}

export default App
