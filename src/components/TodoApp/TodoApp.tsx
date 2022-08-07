import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList/TodoList';

export const TodoApp: React.FC = () => {
  const [value, setValue] = useState('');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  const createNewTodo = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo: Todo = {
      id: +new Date(),
      title: value,
      completed: false,
    };

    setVisibleTodos(prevState => [...prevState, newTodo]);
    setValue('');
  };

  const itemsLeft = visibleTodos.filter(todos => !todos.completed).length;

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={(event) => createNewTodo(event)}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList />
      </section>

      {visibleTodos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${itemsLeft} items left`}
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
      )}

    </div>
  );
};
