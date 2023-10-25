/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useMemo, useContext } from 'react';
import { Filter } from './types/Filter';
import { TodosContext } from './components/TodosContext';
import { Todolist } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const todosContext = useContext(TodosContext);

  const {
    todos,
    addTodo,
    deleteCompletedTodos,
    handleToggleAll,
    todoCount,
    completedTodos,
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

      {!!todos.length && (
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
