import * as Redux from 'redux';
import thunk from 'redux-thunk';

import Reducers from '~/reducers';

const Store = ((_Redux, _Reducers) => {
  const middleware = _Redux.applyMiddleware(thunk);
  const reducers = _Redux.combineReducers(_Reducers);

  return Redux.createStore(reducers, {}, Redux.compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  ));
})(Redux, Reducers);

export default Store;
