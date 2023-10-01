/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo, useState } from 'react';
import classNames from 'classnames';
import { TodosContext } from './components/context/TodoContext';
import { TodoList } from './components/TodoList/TodoList';
import { Status } from './types/StatusEnum';
import { statusLinks } from './filters/FilterStatus';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState(Status.All);

  const {
    todos,
    addTodo,
    handleToggleAll,
    deleteCompletedTodos,
    filterTodos,
    hasCompletedTodos,
    incompletedTodosCount,
  } = useContext(TodosContext);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '') {
      return;
    }

    addTodo(title);

    setTitle('');
  };

  const handleClearCompleted = () => {
    deleteCompletedTodos();
  };

  const handleFilterChange = (status: Status) => {
    setFilterStatus(status);
  };

  const filteredTodos = useMemo(() => {
    return filterTodos(filterStatus);
  }, [filterStatus, todos]);

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
        {!!todos.length && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={filteredTodos} />
          </>
        )}
      </section>

      {!!todos.length && (
        <footer className="footer" data-cy="todosFilter">
          <span className="todo-count" data-cy="todosCounter">
            {`${incompletedTodosCount} items left`}
          </span>

          <ul className="filters">
            {statusLinks.map(({ path, filterValue, label }) => (
              <li key={path}>
                <a
                  href={path}
                  className={classNames({
                    selected: filterStatus === filterValue,
                  })}
                  onClick={() => handleFilterChange(filterValue)}
                >
                  {label}
                </a>
              </li>
            ))}
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
      )}
    </div>
  );
};
