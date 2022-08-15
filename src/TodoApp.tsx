/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, {
  useCallback, useContext, useMemo, useState,
} from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { deleteTodoFromServer } from './api';
import { Status } from './apis';
import { Loader } from './Loader';
import { NewTodo } from './NewTodo';
import { TodosContext } from './TodosProvider';

const statuses = Object.entries(Status);

export const TodoApp: React.FC = () => {
  const { todos, setTodos, isLoad } = useContext(TodosContext);
  const param = useParams();

  const resetChange = useCallback(() => {
    setTodos([...todos]);
  }, [todos]);

  const useDark = useMemo(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDark) {
      document.body.classList.toggle('dark-theme');
    }

    return isDark;
  }, []);

  const [theme, setTheme] = useState(useDark ? 'dark' : 'light');

  const activeTodo = useMemo(
    () => todos.filter(todo => !todo.completed).length, [todos],
  );

  return (
    <div className="todoapp">
      <div className="container">
        <input
          checked={theme === 'light'}
          className="input"
          onChange={() => {
            setTheme(prevTheme => {
              document.body.classList.toggle('dark-theme');

              if (prevTheme === 'dark') {
                return 'light';
              }

              return 'dark';
            });
          }}
          type="checkbox"
          id="toggle"
        />
        <label className={'toggle '.concat(theme)} htmlFor="toggle">
          <i className={classNames(
            'bx',
            { 'bxs-sun': theme === 'light', 'bx-sun': theme === 'dark' },
          )}
          />
          <i className={classNames(
            'bx',
            { 'bxs-moon': theme === 'dark', 'bx-moon': theme === 'light' },
          )}
          />
          <span className="ball" />
        </label>
      </div>

      <header className="header">
        <h1>todos</h1>

        {!param.username ? (<Outlet />) : (<NewTodo />)}

      </header>

      {todos.length > 0 && param.username && (
        <>
          <section className="main">
            <input
              checked={todos.every(todo => todo.completed)}
              onChange={event => {
                const editedTodos = todos.map(todo => {
                  const editedTodo = {
                    ...todo,
                    completed: event.target.checked,
                  };

                  return editedTodo;
                });

                setTodos(editedTodos);
              }}
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            {param.username && (<Outlet />)}
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {activeTodo}
              {activeTodo < 2 ? ' item ' : ' items '}
              left
            </span>

            <ul className="filters">
              {statuses.map(status => (
                <li key={status[0]}>
                  <NavLink
                    to={`${param.username}/${status[1]}`}
                    className={({ isActive }) => {
                      return isActive ? 'selected' : '';
                    }}
                  >
                    {status[0]}
                  </NavLink>
                </li>
              ))}
            </ul>

            {activeTodo < todos.length && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => {
                  const editedTodos = todos.filter(todo => !todo.completed);
                  const clearTodos = todos.filter(todo => todo.completed);

                  clearTodos.forEach((clearTodo) => {
                    deleteTodoFromServer(clearTodo.id)
                      .catch(resetChange);
                  });

                  setTodos(editedTodos);
                }}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
      {isLoad && param.username && (<Loader />)}
    </div>
  );
};
