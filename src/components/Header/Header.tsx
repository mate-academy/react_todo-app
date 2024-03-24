import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { TodosContext } from '../../TodosContext';

export const Header: React.FC = () => {
  const { todos, addTodo, setTodos } = useContext(TodosContext);

  const [currentTitleValue, setCurrentTitlevalue] = useState('');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentTitleValue.trim().length > 0) {
      addTodo({
        id: new Date(),
        title: currentTitleValue.trim(),
        completed: false,
      });
    }

    setCurrentTitlevalue('');
  };

  const handleTitleChenger = (event: ChangeEvent<HTMLInputElement>) => {
    const updateTodos = todos.map(todo => {
      return { ...todo, completed: event.target.checked };
    });

    setTodos(updateTodos);
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form action="/" method="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={currentTitleValue}
          onChange={event => {
            setCurrentTitlevalue(event.target.value);
          }}
        />
      </form>
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={handleTitleChenger}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
      </section>
    </header>
  );
};
