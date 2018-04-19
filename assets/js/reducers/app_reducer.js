const initialState = {
  user: {},
  isLoggedIn: false,
  showLoginModal: false,
  loginModal: {
    email: '',
    password: '',
    isLoggingIn: false,
  },
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
      return { ...state, loginModal: { ...state.loginModal, isLoggingIn: false } }
    case 'APP:HOME:LOGIN:FAILURE':
      return { ...state, loginModal: { ...state.loginModal, isLoggingIn: false } }
    default:
      return state
  }
}

export default App
