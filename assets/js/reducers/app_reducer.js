const initialState = {
  user: {},
  isLoggedIn: false,
  showLoginModal: false,
}

const App = (state = initialState, action) => {
  switch(action.type) {
    case 'APP:HOME:TOGGLE_LOGIN_MODAL':
      return { ...state, showLoginModal: !state.showLoginModal }
    default:
      return state
  }
}

export default App;
