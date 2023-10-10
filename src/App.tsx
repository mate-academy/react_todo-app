/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Status } from './types/Status';
import { TodosContext } from './TodosContext';
import { TodosFilter } from './components/TodosFilter/TodosFilter';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(Status.ALL);
  const todosContext = useContext(TodosContext);

  const {
    todos,
    addTodo,
    toggleAll,
    filterTodos,
    clearCompleted,
    todoCount,
    isCompleted,
  } = todosContext;

  const filteredTodos = filterTodos(filter);

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    addTodo(trimmedTitle);

    setTitle('');
  }

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={toggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={filteredTodos} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${todoCount} items left`}
            </span>

            <TodosFilter
              filter={filter}
              setFilter={setFilter}
            />

            {isCompleted && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearCompleted}
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
