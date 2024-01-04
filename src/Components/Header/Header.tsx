import React, { useContext } from 'react';
import { DispatchContext, TodoContext } from '../../Data/Store';

export const Header: React.FC = () => {
  const { value } = useContext(TodoContext);
  const dispatch = useContext(DispatchContext);

  const addTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const todoTitle = event.currentTarget.value.trim();

      if (todoTitle) {
        dispatch({
          type: 'addTodo',
          payLoad: event.currentTarget.value,
        });

        dispatch({
          type: 'changeValue',
          payLoad: '',
        });
      }
    }
  };

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'changeValue',
      payLoad: event.target.value,
    });
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={(event) => event.preventDefault()}>
        <input
          onKeyUp={addTodo}
          onChange={changeValue}
          value={value}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
