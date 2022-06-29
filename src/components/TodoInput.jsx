import React from 'react';

export const TodoInput = ({ input, setInput }) => (
  <input
    type="text"
    className="new-todo"
    placeholder="Stuff which needs to be done"
    data-cy="createTodo"
    value={input}
    onChange={e => setInput(e.target.value)}
  />
);
