import * as Redux from 'redux';

import thunkMiddleware from 'redux-thunk'
import History from '~/lib/history'
import { Route } from 'react-router'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import createApiMiddleware from '~/store/api_middleware'

import Reducers from '~/reducers';

const Store = ((_Redux, _Reducers) => {
  const middleware = _Redux.applyMiddleware(
    thunkMiddleware,
    routerMiddleware(History),
    createApiMiddleware()
  );

  const reducers = _Redux.combineReducers(_Reducers, {
    router: routerReducer,
  });

  return Redux.createStore(reducers, {}, Redux.compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  ));
})(Redux, Reducers);

export default Store;
