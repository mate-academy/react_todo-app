import { legacy_createStore as createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { todosReducer } from './todosReducer';

const rootReducer = combineReducers({
  todos: todosReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
export type RootState = ReturnType<typeof rootReducer>;
