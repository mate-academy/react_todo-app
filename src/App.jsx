import React from 'react';
import debounce from 'lodash.debounce';
import TodoApp from './components/TodoApp';

import { saveTodos } from './api/localStorage';
import { store } from './store';

store.subscribe(
  debounce(() => {
    saveTodos(store.getState());
  }, 800),
);

function App() {
  return (
    <section className="todoapp">
      <TodoApp />
    </section>
  );
}

export default App;
