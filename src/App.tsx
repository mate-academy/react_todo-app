/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo, useState } from 'react';
import classNames from 'classnames';
import { TodoList } from './components/TodoList/TodoList';
import { TodoContext } from './context/TodoContext';
import { Status } from './types/Status';
import { useGetVisibleTodos } from './functions/getVisibleTodos';

export const App: React.FC = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const [title, setTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState(Status.All);

  const addTodo = () => dispatch({ type: 'addTodo', payload: title });
  const toogleAll = () => dispatch({ type: 'toggleAllTodo' });
  const deleteCompletedTodo = () => dispatch({ type: 'deleteCompletedTodo' });

  const getVisibleTodos = useGetVisibleTodos(filterStatus);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    addTodo();

    setTitle('');
  };

  const handleFilterChange = (status: Status) => {
    setFilterStatus(status);
  };

  const incompletedTodosCount = todos.filter(
    (todo) => !todo.completed,
  ).length;

  const hasCompletedTodos = todos.some((todo) => todo.completed);

  const filteredTodos = useMemo(() => {
    return getVisibleTodos;
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
            onChange={event => setTitle(event.target.value)}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={toogleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

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
                  className={classNames({
                    selected: filterStatus === Status.All,
                  })}
                  onClick={() => handleFilterChange(Status.All)}

                >
                  All
                </a>
              </li>

              <li>
                <a
                  href="#/active"
                  className={classNames({
                    selected: filterStatus === Status.Active,
                  })}
                  onClick={() => handleFilterChange(Status.Active)}
                >
                  Active
                </a>
              </li>

              <li>
                <a
                  href="#/completed"
                  className={classNames({
                    selected: filterStatus === Status.Completed,
                  })}
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
                onClick={deleteCompletedTodo}
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
