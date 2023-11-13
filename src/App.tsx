/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodosContext } from './components/TodosContext';
import { TodosFilter } from './components/TodosFilter';

export const App: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const todosContext = useContext(TodosContext);

  const {
    todos,
    addTodo,
    toggleAll,
    deleteCompletedTodos,
    activeTodoCount,
    hasCompletedTodos,
  } = todosContext;

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      return;
    }

    addTodo(newTitle);
    setNewTitle('');
  };

  // const filteredTodos = useMemo(() => {
  //   return filterTodos(filter);
  // }, [filter, todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={() => toggleAll()}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList />

      </section>

      {todos.length > 0
        && (
          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {activeTodoCount === 1
                ? ('1 item left')
                : (`${activeTodoCount} items left`)}
            </span>

            <TodosFilter />

            {hasCompletedTodos && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => deleteCompletedTodos()}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
    </div>
  );
};
