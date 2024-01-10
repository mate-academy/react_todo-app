import React, { useContext, useState } from 'react';

import { removeExtraSpaces } from '../utils/removeExtraSpaces';
import { TodosContext } from '../context/TodosContext';

export const Header: React.FC = () => {
  const [newtTodo, setNewTodo] = useState('');
  const { addNewTodo } = useContext(TodosContext);

  const handleAdd = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();

    const todo = removeExtraSpaces(newtTodo);

    if (todo.length > 0) {
      addNewTodo(todo);
    }

    setNewTodo('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleAdd} onBlur={handleAdd}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={newtTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
      </form>
    </header>
  );
};
