import React, { useContext, useState } from 'react';
import { DispatchContext, TodosContext } from '../TodosContext';
import { getTodoId } from '../services/getTodoId';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');

  const dispatch = useContext(DispatchContext);
  const todos = useContext(TodosContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.length) {
      dispatch({
        type: 'add',
        data: {
          id: getTodoId(todos),
          title,
          completed: false,
        },
      });
    }

    setTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
