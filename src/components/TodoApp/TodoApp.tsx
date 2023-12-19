import React, { useContext, useEffect, useMemo } from 'react';
import { ActionTypes } from '../../types/ActionTypes';
import { FilterOption } from '../../types/FilterOption';
import { DispatchContext, StateContext } from '../../store/Store';
import { filterOptions } from '../../constants/filterOptions';
import { Header } from '../Header';
import { TodosFilter } from '../TodosFilter';
import { TodoList } from '../TodoList';

export const TodoApp: React.FC = () => {
  const { todos, currentFilter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const activeTodosCounter = useMemo(() => (
    todos.filter(({ completed }) => !completed).length
  ), [todos]);

  const filteredTodos = useMemo(() => (
    todos.filter(currentFilter.callback)
  ), [todos, currentFilter]);

  const toggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionTypes.ToggleAllTodos,
      payload: {
        isChecked: event.target.checked,
      },
    });
  };

  const clearCompleted = () => {
    dispatch({
      type: ActionTypes.ClearCompleted,
    });
  };

  useEffect(() => {
    const chooseFilter = (filter: FilterOption) => {
      dispatch({
        type: ActionTypes.ChangeFilter,
        payload: filter,
      });
    };

    const handleHashChange = (event: HashChangeEvent) => {
      const { hash } = new URL(event.newURL);
      const foundedFilter = filterOptions.find(option => (
        option.hash === hash
      ));

      chooseFilter(foundedFilter || filterOptions[0]);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [dispatch]);

  return (
    <div className="todoapp">
      <Header />

      {!!todos.length
        && (
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={!activeTodosCounter}
              onChange={toggleAll}
            />

            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList items={filteredTodos} />
          </section>
        )}

      {!!todos.length
        && (
          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${activeTodosCounter} items left`}
            </span>

            <TodosFilter />

            {todos.length > activeTodosCounter
              && (
                <button
                  type="button"
                  className="clear-completed"
                  onClick={clearCompleted}
                >
                  Clear completed
                </button>
              )}
          </footer>
        )}
    </div>
  );
};
