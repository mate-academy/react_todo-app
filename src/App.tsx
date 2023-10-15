/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useState, useCallback, useMemo,
} from 'react';

import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { TodosContext } from './TodosContext';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const {
    todos,
    completedTodos,
    todoCount,
    addTodo,
    handleToggleAll,
    deleteCompletedTodos,
    filterTodos,
  } = useContext(TodosContext);

  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const isAllCompleted = todos.every(todo => todo.completed)
    && todos.length > 0;

  const handleTodoSubmit = useCallback((
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!title) {
      return;
    }

    addTodo(title);

    setTitle('');
  }, [title]);

  const handleTitleChange = useMemo(() => (
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    }
  ), [title]);

  const filteredTodos = useMemo(() => {
    return filterTodos(filter);
  }, [filter, todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleTodoSubmit}>
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
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onClick={handleToggleAll}
          checked={isAllCompleted}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        {todos.length > 0 && (
          <TodoList todos={filteredTodos} />
        )}

      </section>

      {todos.length > 0 && (
        <footer className="footer" data-cy="todosFilter">
          <span className="todo-count" data-cy="todosCounter">
            {todoCount === 1 ? (
              `${todoCount} item left`
            ) : (
              `${todoCount} items left`
            )}
          </span>

          <TodosFilter
            filter={filter}
            setFilter={setFilter}
          />

          {completedTodos && (
            <button
              type="button"
              className="clear-completed"
              onClick={deleteCompletedTodos}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}

    </div>
  );
};
