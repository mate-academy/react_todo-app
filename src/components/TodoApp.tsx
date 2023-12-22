import { useState } from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import { activeTodosCounter, todos } from '../signals/todos-signal';
import { Header } from './Header';
import { TodoList } from './TodoList';

export const TodoApp = () => {
  // eslint-disable-next-line
  console.log('TodoApp render');
  useSignals();

  const [isChecked, setIsChecked] = useState(false);

  const handleClearCompleted = () => {
    todos.value = todos.value.filter(todo => !todo.completed);
  };

  return (
    <div className="todoapp">
      <Header />
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={isChecked}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList />
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${activeTodosCounter.value} ${activeTodosCounter.value === 1 ? 'item left' : 'items left'}`}
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

        {todos.value.some(todo => todo.completed) && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleClearCompleted}
          >
            Clear completed
          </button>
        )}
      </footer>
    </div>
  );
};
