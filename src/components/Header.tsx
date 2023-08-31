import React, { useContext, useState } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';

export const Header: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');

  const addTodo = (event: React.KeyboardEvent) => {
    if (!title) {
      return;
    }

    if (event.key === 'Enter') {
      setTodos([
        {
          title,
          id: +new Date(),
          completed: false,
        },
        ...todos,
      ]);

      setTitle('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => setTitle(event.target.value.trimStart())}
          onKeyDown={addTodo}
        />
      </form>
    </header>
  );
};
