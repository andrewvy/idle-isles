import 'whatwg-fetch'

import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'

import 'bulma'

import Store from '~/store'
import History from '~/lib/history'
import { AuthRoute } from '~/lib/router_helpers'

import App from '~/components/app'
import Home from '~/components/home'

const wrapper = document.getElementById('app')

if (wrapper) {
  render(
    <Provider store={Store}>
      <ConnectedRouter history={History}>
        <div>
          <Route exact path='/' component={App} />
          <AuthRoute path='/home' component={Home} />
        </div>
      </ConnectedRouter>
    </Provider>
  , wrapper
  )
}
