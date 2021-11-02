import React, { useContext, useEffect } from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { StateContext, DispatchContext } from './components/StateContext';

function App() {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  // console.log(todos);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <TodoApp dispatch={dispatch} />
      </header>

      {todos && (
        <TodoList items={todos} />
      )}

      <footer className="footer">
        <span className="todo-count">
          3 items left
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </section>
  );
}

export default App;
