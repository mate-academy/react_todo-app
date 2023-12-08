import React from 'react';

import './NewTodo.scss';

const NewTodo: React.FC = () => {
  return (
    <form>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};

export default NewTodo;
