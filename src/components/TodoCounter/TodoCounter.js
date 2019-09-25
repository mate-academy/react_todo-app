import React from 'react';

const TodoCounter = ({ ToDo, done }) => (
  <span className="todo-count">
    {`${ToDo} items left, ${done} completed`}
  </span>
);

export default TodoCounter;
