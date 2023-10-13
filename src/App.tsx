/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { todoContext, DefaultValueType } from './Contexts/Context';
import TodoList from './components/TodoList';

export const App: React.FC = () => {
  const {
    setTodos,
    query,
    setQuery,
    todos,
  } = useContext(
    todoContext,
  ) as DefaultValueType;

  function createTodo() {
    setTodos([
      ...todos,
      {
        completed: false,
        id: +new Date(),
        title: query,
      },
    ]);
  }

  const submitTodo = () => {
    if (!query.trim()) {
      return;
    }

    createTodo();
    setQuery('');
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      submitTodo();
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onEnter}
            onBlur={submitTodo}
          />
        </form>
      </header>

      {!!todos.length && <TodoList />}
    </div>
  );
};
