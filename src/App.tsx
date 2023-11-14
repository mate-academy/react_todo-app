import React, { useState, useMemo, useContext } from 'react';
import { Filter } from './types/Filter';
import { TodosContext } from './components/TodosContext';
import { Todolist } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const todosContext = useContext(TodosContext);

  const {
    todos,
    addTodo,
    deleteCompletedTodos,
    toggleCompletionOfAllTodos,
    todoCount,
    completedTodos,
    filterTodos,
  } = todosContext;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    addTodo(query);

    setQuery('');
  };

  const handleClearCompleted = () => {
    deleteCompletedTodos();
  };

  const filteredTodos = useMemo(() => {
    return filterTodos(filter);
  }, [filter, filterTodos]);

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
            value={query}
            onChange={handleTitleChange}
          />
        </form>
      </header>

      {!!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={toggleCompletionOfAllTodos}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <Todolist
              todos={filteredTodos}
            />
          </section>

          <footer className="footer" data-cy="todosFilter">
            <span className="todo-count" data-cy="todosCounter">
              {todoCount === 1
                ? `${todoCount} item left`
                : `${todoCount} items left`}
            </span>

            <TodoFilter
              filter={filter}
              setFilter={setFilter}
            />

            {completedTodos && (
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
