import { API_TYPE } from '~/lib/api'

const endpoint = '/api'

const defaultConfig = {
  successSuffix: 'SUCCESS',
  errorSuffix: 'FAILURE'
}

const parseJSON = response => (
  response.json()
)

const createApiMiddleware = (config = defaultConfig) => store => next => action => {
  if (action.hasOwnProperty(API_TYPE)) {
    const requestAction = action[API_TYPE]
    const authToken = store.getState().App.authToken

    const baseHeaders = {
      'Content-Type': 'application/json'
    }

    const authHeaders = authToken ? {
      'Authorization': `Bearer ${authToken}`
    } : {}

    const headers = {
      ...baseHeaders,
      ...authHeaders
    }

    const actionType = requestAction.type
    const body = JSON.stringify(requestAction.data)

    const options = {
      headers,
      body,
      method: 'POST'
    }

    store.dispatch({
      type: `${actionType}:STARTED`
    })

    return window.fetch(endpoint, options)
      .then(parseJSON)
      .then(({data, errors}) => {
        if (errors) {
          store.dispatch({
            type: `${actionType}:FAILURE`,
            data: errors
          })
        } else {
          store.dispatch({
            type: `${actionType}:SUCCESS`,
            data
          })
        }
      })
  } else {
    return next(action)
  }
}

export default createApiMiddleware
