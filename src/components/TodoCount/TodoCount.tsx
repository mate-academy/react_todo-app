import React from 'react';

import './TodoCount.scss';

const TodoCount: React.FC = () => {
  return (
    <span className="todo-count" data-cy="todosCounter">
      3 items left
    </span>
  );
};

export default TodoCount;
