import React, { useContext, useMemo, useState } from 'react';
import { TodosContext } from './TodosContext';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodoFilter';

export const TodoApp: React.FC = () => {
  const context = useContext(TodosContext);
  const { todos, toggleAll, addTodo, handleDeleteCompleted } = context;
  const [title, setTitle] = useState('');

  const todosUncompleteLength = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);
  const todosCompletedAtLeastOne = useMemo(() => {
    return todos.some(todo => todo.completed === true);
  }, [todos]);

  const todosCompletedAll = useMemo(() => {
    return todos.every(todo => todo.completed === true);
  }, [todos]);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim().length !== 0) {
      addTodo({
        id: +new Date(),
        title,
        completed: false,
      });
      setTitle('');
    }
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit} onBlur={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={handleTitle}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={toggleAll}
            checked={todosCompletedAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList />
        </section>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {todosUncompleteLength} items left
          </span>

          <TodosFilter />

          {todosCompletedAtLeastOne && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleDeleteCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
