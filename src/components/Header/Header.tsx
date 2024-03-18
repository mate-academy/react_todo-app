import React, { useContext, useState } from 'react';
import { TodosContext } from '../../TodosContext';

export const Header: React.FC = () => {
  const { addTodo } = useContext(TodosContext);
  const [currentTitleValue, setCurrentTitlevalue] = useState('');

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        action="/"
        method="POST"
        onSubmit={event => {
          event.preventDefault();

          if (currentTitleValue.trim().length > 0) {
            addTodo({
              id: new Date(),
              title: currentTitleValue.trim(),
              completed: false,
            });
          }

          setCurrentTitlevalue('');
        }}
      >
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
    </header>
  );
};
