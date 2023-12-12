/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoContext } from './context/TodoContext';

export const App: React.FC = () => {
  const { todos, setTodos, addTodo } = useContext(TodoContext);

  const [query, setQuery] = useState('');

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addTodo(query);
    setQuery('');
  };

  const handleMakeAllCompletedTodo = () => {
    const updatedTodo = todos.map(todo => (
      { ...todo, completed: !todo.completed }));

    setTodos(updatedTodo);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={handleAddTodo}>
          <input
            value={query}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={handleQuery}
          />
        </form>
      </header>
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={handleMakeAllCompletedTodo}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list" data-cy="todoList">
          <TodoList />
        </ul>
      </section>
      <footer>
        <TodoFilter />
      </footer>
    </div>
  );
};
