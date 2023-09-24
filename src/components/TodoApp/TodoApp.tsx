import React, {
  memo,
  useMemo,
  useState,
  useContext,
} from 'react';

import { ActionType, Status } from '../../types';
import { TodosContext } from '../TodosProvider';
import { NewTodo } from '../NewTodo';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';

export const TodoApp: React.FC = memo(() => {
  const { todos, dispatch } = useContext(TodosContext);
  const [filterStatus, setFilterStatus] = useState(Status.All);

  const handleToggleAllChange = () => {
    dispatch({
      type: ActionType.ToggleAll,
    });
  };

  const handleClearCompletedClick = () => {
    dispatch({
      type: ActionType.ClearCompleted,
    });
  };

  const hasTodos = todos.length > 0;
  const hasCompleted = todos.some(({ completed }) => completed);
  const isAllCompleted = todos.every(({ completed }) => completed);
  const activeCount = todos.filter(({ completed }) => !completed).length;
  const activeText = ` ${activeCount === 1 ? 'item' : 'items'} left`;

  const filteredTodos = useMemo(() => {
    return todos.filter(({ completed }) => {
      switch (filterStatus) {
        case Status.Active:
          return !completed;

        case Status.Completed:
          return completed;

        case Status.All:
        default:
          return true;
      }
    });
  }, [todos, filterStatus]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <NewTodo />
      </header>

      {hasTodos && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              data-cy="toggleAll"
              className="toggle-all"
              checked={isAllCompleted}
              onChange={handleToggleAllChange}
            />

            <label htmlFor="toggle-all">
              Mark all as complete
            </label>

            <TodoList items={filteredTodos} />
          </section>

          <footer className="footer">
            <span className="todo-count">
              <strong data-cy="todosCounter">
                {activeCount}
              </strong>

              {activeText}
            </span>

            <TodosFilter
              status={filterStatus}
              onStatusChange={setFilterStatus}
            />

            {hasCompleted && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleClearCompletedClick}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
});
