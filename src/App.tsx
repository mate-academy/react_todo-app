/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import TodoForm from './components/TodoForm/TodoForm';
import { useTodo } from './context/TodoContext';
import TodoList from './components/TodoList/TodoList';
import TodoControls from './components/TodoControls/TodoControls';

export const App: React.FC = () => {
  const { visibleTodos, toggleAllStatus } = useTodo();

  const handleToggleAll = () => {
    toggleAllStatus();
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <TodoForm />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={!visibleTodos.map((item) => item.completed).includes(false)}
          onChange={handleToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList todos={visibleTodos} />
      </section>

      <TodoControls />
    </div>
  );
};
