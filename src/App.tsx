/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { TodosContext } from './components/context/TodoContext';
import { Todo } from './types/Todo';
import { Status } from './types/StatusEnum';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState(Status.All);

  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    return null;
  }

  const {
    todos,
    addTodo,
    deleteCompletedTodos,
  } = todosContext;

  const incompletedTodosCount = todos.filter(
    (todo: Todo) => !todo.completed,
  ).length;

  const hasCompletedTodos = todos.some(todo => todo.completed);

  // #region #HANDLING EVENTS
  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (title.trim() === '') {
      return;
    }

    addTodo(title);

    setTitle('');
  }

  function handleClearCompleted() {
    deleteCompletedTodos();
    setFilterStatus(Status.All);
  }
  // #endregion

  // #region #FILTERING
  function handleFilterChange(status: Status) {
    setFilterStatus(status);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filteredTodos = useMemo(() => {
    switch (filterStatus) {
      case Status.All:
        return todos;

      case Status.Active:
        return todos.filter(todo => !todo.completed);

      case Status.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [filterStatus, todos]);
  // #endregion

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={handleTitleChange}
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

        <TodoList todos={filteredTodos} />
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${incompletedTodosCount} items left`}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className="selected"
              onClick={() => handleFilterChange(Status.All)}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              onClick={() => handleFilterChange(Status.Active)}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              onClick={() => handleFilterChange(Status.Completed)}
            >
              Completed
            </a>
          </li>
        </ul>

        {hasCompletedTodos && (
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
