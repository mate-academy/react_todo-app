/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { DispatchContext, TodosContext } from './store/Store';
import { clearCompletedTodos, countPreparedItems } from './utils/utils';
import { FilterItem } from './components/Footer/FilterItem';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const displayElements = todos.length > 0;
  const dispatch = useContext(DispatchContext);

  const countActiveTodos = countPreparedItems(todos);
  const displayButton = todos.some(todo => todo.completed === true);

  return (
    <div className="todoapp">
      <Header />
      {displayElements && (
        <>
          <Main />
          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {countActiveTodos} items left
            </span>

            <ul className="filters" data-cy="todosFilter">
              <FilterItem currentFilter={Status.all} />
              <FilterItem currentFilter={Status.active} />
              <FilterItem currentFilter={Status.completed} />
            </ul>
            {displayButton && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => {
                  clearCompletedTodos(todos, dispatch);
                }}
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
