import React, { useContext } from 'react';
import { TodosContext } from '../../TodosContext';
import { TodoList } from '../TodoList';
import { TodoFilter } from '../TodosFilter';
import { TodoHeader } from '../TodoHeader';

export const TodoApp: React.FC = () => {
  const {
    visibleTodos,
    activeTodos,
    isAnyTodo,
    isEachTodoComplete,
    isAnyTodoComplete,
    handleAllTodosComplete,
    handleRemoveTodosComplete,
  } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <TodoHeader />

      {isAnyTodo
        && (
          <>
            <section className="main">
              <input
                type="checkbox"
                checked={isEachTodoComplete}
                id="toggle-all"
                className="toggle-all"
                data-cy="toggleAll"
                onChange={handleAllTodosComplete}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>

              <TodoList items={visibleTodos} />
            </section>

            <footer className="footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${activeTodos.length} item${activeTodos.length <= 1 ? '' : 's'} left`}
              </span>

              <TodoFilter />

              {isAnyTodoComplete && (
                <button
                  type="button"
                  className="clear-completed"
                  onClick={handleRemoveTodosComplete}
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
