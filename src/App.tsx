import React, { useState, useMemo, useContext } from 'react';
import { TodosFilter } from './components/TodosFilter';
import { TodoList } from './components/TodoList';
import { Status } from './types/StatusEnum';
import { TodosContext } from './components/TodoContext';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Status>(Status.All);

  const todosContext = useContext(TodosContext);

  const {
    todos,
    addTodo,
    deleteCompletedTodos,
    handleToggleAll,
    incompletedTodosCount,
    hasCompletedTodos,
    filterTodos,
  } = todosContext;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '') {
      return;
    }

    addTodo(title);

    setTitle('');
  };

  const handleClearCompleted = () => {
    deleteCompletedTodos();
  };

  const filteredTodos = useMemo(() => {
    return filterTodos(filter);
  }, [filter, todos]);

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
            onChange={handleTitleChange}
          />
        </form>
      </header>
      {todos.length !== 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              todos={filteredTodos}
            />
          </section>

          <footer className="footer" data-cy="todosFilter">
            <span className="todo-count" data-cy="todosCounter">
              {incompletedTodosCount === 1
                ? `${incompletedTodosCount} item left`
                : `${incompletedTodosCount} items left`}
            </span>

            <TodosFilter
              filter={filter}
              setFilter={setFilter}
            />

            {hasCompletedTodos && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleClearCompleted}
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
