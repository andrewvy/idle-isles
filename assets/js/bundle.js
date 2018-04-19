import 'whatwg-fetch'

import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import 'bulma'

import App from '~/components/app'
import Store from '~/store'

const wrapper = document.getElementById('app')

if (wrapper) {
  render(
    <Provider store={Store}>
      <App />
    </Provider>
  , wrapper
  )
}
