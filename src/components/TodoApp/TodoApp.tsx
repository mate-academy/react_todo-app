import React, { useState } from 'react';

export const TodoApp: React.FC = () => {
  const [todo, setTodo] = useState('');

  const handleSetTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
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
            onChange={handleSetTodo}
          />
        </form>
        <div>{todo}</div>
      </header>
    </div>
  );
};
