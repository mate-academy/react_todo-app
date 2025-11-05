/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useDispatch, useTodos } from './store/Store';
import Header from './components/Header';
import TodoList from './components/TodoList';
import { StatusFilter } from './types/Todo';
import classNames from 'classnames';

export const App: React.FC = () => {
  const { todos, filter: currentFilter } = useTodos();
  const dispatch = useDispatch();

  const notCompletedTodos = todos.filter(todo => !todo.completed).length;

  const statuses = Object.values(StatusFilter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <>
            <TodoList />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {notCompletedTodos} items left
              </span>

              <nav className="filter" data-cy="Filter">
                {statuses.map(status => (
                  <a
                    key={status}
                    href={`#/${status === StatusFilter.ALL ? '' : status.toLowerCase()}`}
                    className={classNames('filter__link', {
                      selected: currentFilter === status,
                    })}
                    data-cy={`FilterLink${status}`}
                    onClick={() => {
                      dispatch({
                        type: 'SET_FILTER',
                        payload: status,
                      });
                    }}
                  >
                    {status}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                onClick={() => {
                  dispatch({
                    type: 'DELETE_COMPLETED_TODOS',
                  });
                }}
                disabled={!todos.some(todo => todo.completed)}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};
