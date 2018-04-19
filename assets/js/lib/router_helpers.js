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
              pathname: "/",
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
}
