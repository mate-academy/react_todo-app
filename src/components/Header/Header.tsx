import React, { useState, useContext } from 'react';
import { DispatchContext } from '../../TodosContext';

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.value.trim()) {
      setTodoTitle(ev.target.value);
    }
  };

  const addTodo = (ev: React.FormEvent) => {
    ev.preventDefault();

    if (todoTitle.trim()) {
      dispatch({
        type: 'add',
        payload: {
          id: +new Date(),
          title: todoTitle,
          completed: false,
        },
      });

      setTodoTitle('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={handleTitleChange}

        />
      </form>
    </header>
  );
};
