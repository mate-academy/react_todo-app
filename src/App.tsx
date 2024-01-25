/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoContext } from './context/TodoContext';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const isAllCompleted = todos.every(todo => todo.completed);

  const handleMakeToggleAll = () => {
    const areMostTodosCompleted = todos.every(todo => todo.completed);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !areMostTodosCompleted,
    }));

    setTodos(updatedTodos);
  };

  return (
    <div className="todoapp">
      <Header />
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={isAllCompleted}
          onChange={handleMakeToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list" data-cy="todoList">
          <TodoList />
        </ul>
      </section>
      <footer>
        {!!todos.length && <TodoFilter />}
      </footer>
    </div>
  );
};
