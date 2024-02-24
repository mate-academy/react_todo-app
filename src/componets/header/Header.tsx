import React, { useContext, useState } from 'react';
import { DispatchContext, TodoContext } from '../../managment/Contextes';

export const Header: React.FC = () => {
  const { todos } = useContext(TodoContext);
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

  const allComplited = todos.every(todo => todo.completed);

  const handlerCompletad = () => {
    dispatch({
      type: 'complited',
      payload: allComplited,
    });
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handlerAdd}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onClick={(handlerCompletad)}
        />
      </form>
    </header>
  );
};
