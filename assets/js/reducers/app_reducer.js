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
  user: null,
  isLoadingUser: false,
  isLoggedIn: false,
  showLoginModal: false,
  loginModal: {
    email: '',
    password: '',
    isLoggingIn: false
  },
  registrationModal: {
    email: '',
    password: '',
    name: '',
    isRegistering: false,
    showRegistrationModal: false,
    error: null
  },
  authToken: getAuthToken()
}

const App = (state = initialState, action) => {
  const data = action.data

  switch (action.type) {
    case 'APP:HOME:TOGGLE_LOGIN_MODAL':
      return { ...state, showLoginModal: !state.showLoginModal }
    case 'APP:HOME:SET_LOGIN_EMAIL':
      return { ...state, loginModal: { ...state.loginModal, email: data.email } }
    case 'APP:HOME:SET_LOGIN_PASSWORD':
      return { ...state, loginModal: { ...state.loginModal, password: data.password } }
    case 'APP:HOME:LOGIN:STARTED':
      return { ...state, loginModal: { ...state.loginModal, isLoggingIn: true } }
    case 'APP:HOME:LOGIN:SUCCESS':
      return setAuthToken({
        ...state,
        loginModal: {
          ...state.loginModal,
          isLoggingIn: false
        }
      }, data.login.token)
    case 'APP:HOME:LOGIN:FAILURE':
      return { ...state, loginModal: { ...state.loginModal, isLoggingIn: false } }
    case 'APP:HOME:TOGGLE_REGISTRATION_MODAL':
      return {
        ...state,
        registrationModal: {
          ...state.registrationModal,
          showRegistrationModal: !state.registrationModal.showRegistrationModal
        }
      }
    case 'APP:HOME:SET_REGISTRATION_MODAL_DATA':
      return {
        ...state,
        registrationModal: {
          ...state.registrationModal,
          ...data
        }
      }
    case 'APP:HOME:REGISTER:STARTED':
      return {
        ...state,
        registrationModal: {
          ...state.registrationModal,
          isRegistering: true
        }
      }
    case 'APP:HOME:REGISTER:SUCCESS':
      return {
        ...state,
        registrationModal: {
          ...state.registrationModal,
          isRegistering: false
        }
      }
    case 'APP:HOME:REGISTER:FAILURE':
      return {
        ...state,
        registrationModal: {
          ...state.registrationModal,
          isRegistering: false,
          error: data.map((error) => error.message).join('\n')
        }
      }
    case 'APP:SET_AUTH_TOKEN':
      return setAuthToken(state, data.token)
    case 'APP:LOGOUT':
      return clearAuthToken(state)
    case 'APP:HOME:LOAD_USER:STARTED':
      return {
        ...state,
        isLoadingUser: true
      }
    case 'APP:HOME:LOAD_USER:SUCCESS':
      return {
        ...state,
        isLoadingUser: false,
        user: data.me
      }
    case 'APP:HOME:LOAD_USER:FAILURE':
      return {
        ...state,
        isLoadingUser: false
      }
    default:
      return state
  }
}

export default App
