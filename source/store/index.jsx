import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers';

// const devtools = '__REDUX_DEVTOOLS_EXTENSION__';

const args = compose(
    applyMiddleware(
      thunkMiddleware,
    ),
    // window[devtools] && window[devtools](),
  );

export default createStore(reducer, args);
