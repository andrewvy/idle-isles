import React from 'react'
import { Route, Redirect } from 'react-router'

import Store from '~/store'

const AuthRoute = ({
  component: Component,
  store,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        Store.getState().App.authToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

const DeauthRoute = ({
  component: Component,
  store,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !Store.getState().App.authToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/home',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export {
  AuthRoute,
  DeauthRoute
}
