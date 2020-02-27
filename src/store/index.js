import { createStore } from 'redux';

import reducer from '../reducers';
import state from './state';

const store = createStore(
  reducer,
  state,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
