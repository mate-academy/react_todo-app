import React from 'react';

export const AddTodoForm: React.FC = () => {
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
