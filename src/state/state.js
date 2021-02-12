/* eslint-disable */
import todoReducer from '../reducers/reducers';

export function createStore(reducer, initialState) {
  let state = initialState;
  let callbacks = [];

  return {
    getState() {
      return state; // {} для получения state
    },
    dispatch(action) {
      state = reducer(state, action); // получает action и update state
      callbacks.forEach(f => f());
    },
    subscribe(f) {
      callbacks.push(f); // подписатся на любые изменения в сторе, вызывает ф, когда что-то изменилось
    },
  };
}

const store = createStore(todoReducer, []);

store.subscribe(() => {
  console.log(store.getState()); // вызывается каждый раз, когда чтото поменялоь
});
