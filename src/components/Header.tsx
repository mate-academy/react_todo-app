import React, { useContext } from 'react';
import { DispatchContext, TodosContext } from '../TodosContext';

export const Header: React.FC = () => {
  const { value } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const addTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch({
        type: 'addTodo',
        payLoad: event.target.value,
      });

      dispatch({
        type: 'changeValue',
        payLoad: '',
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          onChange={handleChange}
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
