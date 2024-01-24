import React, { useContext, useState } from 'react';
import { DispatchContext } from '../../managment/Contextes';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useContext(DispatchContext);

  const handlerAdd = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'addTodo',
      title,
    });
    setTitle('');
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
          onChange={e => setTitle(e.target.value)}
          onBlur={handlerAdd}
        />
      </form>
    </header>
  );
};
