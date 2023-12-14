/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';
import { Status } from './types/filterENUM';
import { useTodos } from './context/TodoContext';
import { linkOptions } from './linkData';

export const App = () => {
  const [title, setTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState(Status.ALL);

  const {
    todos,
    addTodo,
    deleteCompletedTodos,
    handleToggleAll,
    incompletedTodosCount,
    hasCompletedTodos,
    filterTodos,
  } = useTodos();

  const handleForSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '') {
      return;
    }

    addTodo(title);
    setTitle('');
  };

  // const handleFilterChange = (status: Status) => {
  //   setFilterStatus(status);
  // };

  const filteredTodos = useMemo(() => {
    return filterTodos(filterStatus);
  }, [filterStatus, todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleForSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        {todos.length !== 0 && (
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

      {todos.length !== 0 && (
        <>
          <footer className="footer" data-cy="todosFilter">
            <span className="todo-count" data-cy="todosCounter">
              {incompletedTodosCount === 1
                ? `${incompletedTodosCount} item left`
                : `${incompletedTodosCount} items left`}
            </span>

            <ul className="filters">
              {linkOptions.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className={classNames({
                      selected: filterStatus === link.filterValue,
                    })}
                    onClick={() => setFilterStatus(link.filterValue)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {hasCompletedTodos && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => deleteCompletedTodos()}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};
