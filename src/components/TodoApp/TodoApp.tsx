import {
  ChangeEvent,
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { DispatchContext, TodosContext } from '../../packages/context';
import { Todo } from '../../libs/types';
import { Actions } from '../../libs/enums';
import { TodoCreate } from '../TodoCreate';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';
import { getFilteredTodos, getHash } from '../../libs/helpers';

export const TodoApp: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const todos = useContext(TodosContext);

  const [filteredTodos, setFilterdTodos] = useState(() => {
    const initialFilterHash = getHash();

    return getFilteredTodos(todos, initialFilterHash);
  });

  const updateFilteredTodos = useCallback((updatedTodos: Todo[]) => {
    const filterHash = getHash();
    const filtered = getFilteredTodos(updatedTodos, filterHash);

    setFilterdTodos(filtered);
  }, []);

  useEffect(() => {
    updateFilteredTodos(todos);
  }, [todos, updateFilteredTodos]);

  useEffect(() => {
    const handleHashChange = () => {
      updateFilteredTodos(todos);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [todos, updateFilteredTodos]);

  const competedCount = useMemo(() => (
    todos.filter(({ completed }) => completed).length
  ), [todos]);

  const activeCount = todos.length - competedCount;

  const handleCreateTodo = useCallback((newTodo: Todo) => {
    dispatch({
      type: Actions.create,
      payload: { todo: newTodo },
    });
  }, [dispatch]);

  const handleToggleAll = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: Actions.toggleAll,
        payload: { isCompleted: event.target.checked },
      });
    },
    [dispatch],
  );

  const handleClearCompleted = useCallback(() => {
    dispatch({ type: Actions.clearComleted });
  }, [dispatch]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <TodoCreate onCreate={handleCreateTodo} />
      </header>

      {!!todos.length && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={!activeCount}
            onChange={handleToggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList items={filteredTodos} />

        </section>
      )}

      {!!todos.length && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${activeCount} items left`}
          </span>

          <TodosFilter />

          {!!competedCount && (
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
