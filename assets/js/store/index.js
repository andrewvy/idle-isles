import * as Redux from 'redux';

import thunkMiddleware from 'redux-thunk'
import History from '~/lib/history'
import { Route } from 'react-router'
import { apiMiddleware } from 'redux-api-middleware'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import Reducers from '~/reducers';

const Store = ((_Redux, _Reducers) => {
  const middleware = _Redux.applyMiddleware(
    thunkMiddleware,
    apiMiddleware,
    routerMiddleware(History)
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
