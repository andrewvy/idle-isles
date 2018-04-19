import * as Redux from 'redux';
import thunkMiddleware from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';

import Reducers from '~/reducers';

const Store = ((_Redux, _Reducers) => {
  const middleware = _Redux.applyMiddleware(thunkMiddleware, apiMiddleware);
  const reducers = _Redux.combineReducers(_Reducers);

  return Redux.createStore(reducers, {}, Redux.compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  ));
})(Redux, Reducers);

export default Store;
