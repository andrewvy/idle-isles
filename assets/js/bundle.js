import 'whatwg-fetch'

import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'

import 'bulma'

import App from '~/components/app'
import Store from '~/store'
import History from '~/lib/history'

const wrapper = document.getElementById('app')

if (wrapper) {
  render(
    <Provider store={Store}>
      <ConnectedRouter history={History}>
        <Route exact path='/' component={App} />
      </ConnectedRouter>
    </Provider>
  , wrapper
  )
}
